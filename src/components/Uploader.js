import React, { useRef } from "react";
import { useStores } from "../stores";
import { Link } from "react-router-dom";
import { observer, useLocalObservable } from "mobx-react";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload, Spin } from "antd";
import styled from "styled-components";
const { Dragger } = Upload;

const Result = styled.div`
  margin-top: 30px;
  border: 1px dashed #ccc;
  padding: 20px;
`;
const H1 = styled.h1`
  margin: 20px 0;
  text-align: center;
`;
const Image = styled.img`
  max-width: 300px;
`;
const CopyButton = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background-color: #0069d9;
  }
`;

const Component = observer(() => {
  const { ImageStore, UserStore } = useStores();
  const ref1 = useRef();
  const ref2 = useRef();
  const store = useLocalObservable(() => ({
    width: null,
    setWidth(width) {
      store.width = width;
    },
    get widthStr() {
      return store.width ? `/w/${store.width}` : "";
    },
    height: null,
    setHeight(height) {
      store.height = height;
    },
    get heightStr() {
      return store.height ? `/h/${store.height}` : "";
    },
    get fullStr() {
      return (
        ImageStore.serverFile.attributes.url.attributes.url +
        "?imageView2/0" +
        store.widthStr +
        store.heightStr
      );
    },
  }));

  const bindWidthChange = () => {
    store.setWidth(ref1.current.value);
  };

  const bindHeightChange = () => {
    store.setHeight(ref2.current.value);
  };

  const props = {
    showUploadList: false,
    beforeUpload: (file) => {
      ImageStore.setFile(file);
      ImageStore.setFilename(file.name);
      if (UserStore.currentUser === null) {
        message.warning("请先登录在上传!");
        return false;
      }
      if (!/(svg$)|(png$)|(jpg$)|(jpeg$)|(gif$)/gi.test(file.type)) {
        message.error("只能上传 svg/png/jpg/gif 格式的图片");
        return false;
      }
      if (file.size > 1024 * 1024) {
        message.error("图片最大 1M");
        return false;
      }
      ImageStore.upload()
        .then((serverFile) => {
          // console.log(serverFile);
        })
        .catch(() => {
          message.warning("上传失败");
        });
      return false;
    },
  };

  return (
    <>
      <Spin tip="上传中" spinning={ImageStore.isUpLoading}>
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">点击或者拖拽上传图片</p>
          <p className="ant-upload-hint">
            仅支持 .png/.jpg/.gif/.svg 格式的图片, 图片最大 1M
          </p>
        </Dragger>
      </Spin>
      <div>
        {ImageStore.serverFile ? (
          <Result>
            <H1>上传结果</H1>
            <dl>
              <dt>线上地址</dt>
              <dd>
                <Link to={ImageStore.serverFile.attributes.url.attributes.url}>
                  在线预览
                </Link>
                <CopyButton
                  onClick={() => {
                    navigator.clipboard
                      .writeText(ImageStore.serverFile.attributes.url.attributes.url)
                      .then(() => {
                        message.success("已复制到剪贴板");
                      })
                      .catch((err) => {
                        console.error("复制链接失败：", err);
                        message.error("复制链接失败");
                      });
                  }}
                >
                  复制链接
                </CopyButton>
              </dd>
              <dt>文件名</dt>
              <dd>{ImageStore.filename}</dd>
              <dt>图片预览</dt>
              <dd>
                <Image
                  src={ImageStore.serverFile.attributes.url.attributes.url}
                />
              </dd>
              <dt>更多尺寸</dt>
              <dd>
                <input
                  ref={ref1}
                  onChange={bindWidthChange}
                  placeholder="最大宽度(可选)"
                />
                <input
                  ref={ref2}
                  onChange={bindHeightChange}
                  placeholder="最大高度(可选)"
                />
              </dd>
              <dd>
                <Link to={store.fullStr}>在线预览</Link>
                <CopyButton
                  onClick={() => {
                    navigator.clipboard
                      .writeText(store.fullStr)
                      .then(() => {
                        message.success("已复制到剪贴板");
                      })
                      .catch((err) => {
                        console.error("复制链接失败：", err);
                        message.error("复制链接失败");
                      });
                  }}
                >
                  复制链接
                </CopyButton>
              </dd>
            </dl>
          </Result>
        ) : null}
      </div>
    </>
  );
});

export default Component;
