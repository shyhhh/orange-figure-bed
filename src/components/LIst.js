import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useStores } from '../stores';
import InfiniteScroll from 'react-infinite-scroller';
import { List, Spin } from 'antd';
import styled from 'styled-components';

const Img = styled.img`
  width: 100px;
  height: 120px;
  object-fit: contain;
  border: 1px solid #eee;
`;

const Component = observer(() => {
  const { HistoryStore } = useStores();

  const loadMore = () => {
    HistoryStore.find();
  };

  useEffect(() => {
    console.log('进入组件')

    return () => {
      console.log('卸载')
      HistoryStore.reset();
    }
  },[]);

  return (
    <>
      <InfiniteScroll
        initialLoad={true}
        pageStart={0}
        loadMore={loadMore}
        hasMore={!HistoryStore.isLoading&&HistoryStore.hasMore}
        useWindow={true}
      >
        <List
          dataSource={HistoryStore.list}
          renderItem={
            item => <List.Item key={item.id}>
              <div>
                <Img src={item.attributes.url.attributes.url}  />
              </div>
              <div>
                <h5>{item.attributes.filename}</h5>
              </div>
              <div>
                 <a target="_blank" href={item.attributes.url.attributes.url}>{item.attributes.url.attributes.url}</a>
              </div>
            </List.Item>
          }
        >
          { HistoryStore.isLoading && HistoryStore.hasMore && (
            <div>
              <Spin tip="加载中"/>
            </div>
          )}
        </List>
      </InfiniteScroll>
    </>
  );
});

export default Component;
