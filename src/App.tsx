import React, { useState } from 'react';
import './App.css';
import { Avatar, Card, Input, Button, ConfigProvider, Radio, Modal, QRCode } from 'antd';
import { Typography } from 'antd';

const { Title } = Typography;
const { TextArea } = Input;

const App: React.FC = () => {

  const url = 'https://api.t1y.net/1436/pay?name='

  const [cupValue, setCupValue] = useState('1');
  const [moneyValue, setMoneyVaule] = useState('7');
  const [nameValue, setNameValue] = useState('');
  const [sayValue, setSayValue] = useState('');

  const handelCupClick = (n: string) => {
    setCupValue(n);
    setMoneyVaule(String(parseInt(n, 10) * 7));
    setQrValue(url + nameValue + '&money=' + moneyValue + '&content=' + sayValue)
  }

  const handleCupChange = (e: any) => {
    if (e.target.value !== '' && e.target.value >= 1) {
      setCupValue(e.target.value);
      setMoneyVaule(String(parseInt(e.target.value, 10) * 7));
      setQrValue(url + nameValue + '&money=' + moneyValue + '&content=' + sayValue)
    } else {
      setCupValue('1');
      setMoneyVaule('7');
      setQrValue(url + nameValue + '&money=' + moneyValue + '&content=' + sayValue)
    }
  }

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleNameChange = (event: any) => {
    setNameValue(event.target.value);
    setQrValue(url + nameValue + '&money=' + moneyValue + '&content=' + sayValue)
  };

  const handleSayChange = (event: any) => {
    setSayValue(event.target.value);
    setQrValue(url + nameValue + '&money=' + moneyValue + '&content=' + sayValue)
  };

  const [qrValue, setQrValue] = useState(url + nameValue + '&money=' + moneyValue + '&content=' + sayValue);

  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#FF813F' } }}>
      <div className='margin-large'>
        <div style={{ textAlign:'center', marginTop:'50px' }}>
          <Avatar size={110} src={"/coffee.webp"} />
          <Title level={3} style={{ margin: '5px 0px 0px' }}>WangHua</Title>
          <p style={{ marginTop: '3px', marginBottom: '20px' }}>Give me a cup of coffee, repay with a pot of tea.</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Card>
            <p>Hey 👋 I just created a page here. You can now buy me a coffee!</p>
          </Card>
          <Card style={{ marginTop: '20px', marginBottom: '20px' }}>
            <Title level={3} style={{ textAlign: 'left' }}>Buy <span style={{ color: '#606266' }}>WangHua</span> a coffee</Title>
            <Card style={{ borderColor: '#FF813F', backgroundColor: 'rgba(255,129,63,0.05)', textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '45px', marginBottom: '5px' }}>☕</span>
              <span style={{ marginRight: '5px', color: '#909399' }}>&nbsp;x</span>
              <Radio.Group defaultValue={cupValue} buttonStyle="solid" size='small' style={{ border: 'none' }}>
                <Radio.Button value="1" onClick={() => handelCupClick('1')} style={{ borderRadius: '50%', marginRight: '8px', width: '30px', height: '30px', lineHeight: '30px', border: 'none' }}>1</Radio.Button>
                <Radio.Button value="3" onClick={() => handelCupClick('3')} style={{ borderRadius: '50%', marginRight: '8px', width: '30px', height: '30px', lineHeight: '30px', border: 'none' }}>3</Radio.Button>
                <Radio.Button value="5" onClick={() => handelCupClick('5')} style={{ borderRadius: '50%', width: '30px', height: '30px', lineHeight: '30px', border: 'none' }}>5</Radio.Button>
              </Radio.Group>
              <Input placeholder="10" onChange={handleCupChange} style={{ width: '40px', marginLeft: '8px' }}/>
            </div>
            </Card>
            <Input placeholder="Name or @yourtwitter (optional)" value={nameValue} onChange={handleNameChange} style={{ marginTop: '10px' }}/>
            <TextArea rows={4} placeholder="say something nice (optional)" value={sayValue} onChange={handleSayChange} style={{ marginTop: '10px' }}/>
            <Button type="primary" size="large" shape="round" onClick={showModal} style={{ marginTop: '10px', width: '100%' }}>Support ¥{moneyValue}</Button>
          </Card>
          <Modal title="Support" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <div>
              <p>Please use Alipay to scan and pay.</p>
              <QRCode
                errorLevel="H"
                value={qrValue}
                icon="/alipay.svg"
              />
            </div>
          </Modal>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default App;
