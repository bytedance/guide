/**
 * iframe: true // 设置为数值可控制 iframe 高度
 */
import React from 'react';
import Guide from 'byte-guide';
import Tag from '../components/Tag';
import './index.css';

const App = (): JSX.Element => {
  return (
    <>
      <table className="tg" id="table">
        <thead>
          <tr>
            <th>客户名称</th>
            <th id="owner">负责人</th>
            <th>审核状态</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>艾卿咖啡店</td>
            <td>销售1</td>
            <td>
              <Tag color="#52c41a">审批通过</Tag>
            </td>
          </tr>
          <tr>
            <td>樊樊书店</td>
            <td>销售2</td>
            <td>
              <Tag color="#1890ff">审批中</Tag>
            </td>
          </tr>
          <tr>
            <td>大帅茶叶店</td>
            <td>销售3</td>
            <td>
              <Tag id="approval-status" color="#F5222D">
                审批失败
              </Tag>
            </td>
          </tr>
          <tr>
            <td>科科花草铺</td>
            <td>销售4</td>
            <td>
              <Tag color="#52c41a">审批通过</Tag>
            </td>
          </tr>
        </tbody>
      </table>
      <Guide
        steps={[
          {
            selector: '#table',
            title: '我们的小店',
            content: '我们都有光明的前途',
            placement: 'top-left',
          },
          {
            selector: '#owner',
            title: 'owner',
            content: 'owner',
            placement: 'right',
          },
          {
            selector: '#approval-status',
            title: 'approval-status',
            content: 'approval-status',
            placement: 'right-top',
          },
        ]}
        showStepInfo
        mask={false}
      />
    </>
  );
};

export default App;
