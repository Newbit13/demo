import React, { useState,JSX } from 'react';
import { Input, Form, Box, Button, Card, DatePicker, Message, Radio, Upload, Divider, Drawer, Checkbox, NumberPicker } from '@alifd/next';

import { UploadProps } from '@alifd/next/types/upload';
import { Moment } from 'moment';

import styles from './index.module.scss';

const FormItem = Form.Item;

const formItemLayout = {
  colSpan: 12,
};

export interface DataSource {
  name?: string;
  category?: string;
  date?: Moment[];
  type?: string;
  pic?: UploadProps[];
  desc?: string;
}

export interface BasicFormProps {
  dataSource?: DataSource;
  onSubmit?: () => void;
}

export interface subjcetSchma {
  index?: number;
  canSkip?: boolean;
  aspect?: never[];
  type?: string;
  title?: string;
  item?: {
      text: string;
      value: number;
  }[];
}

const BasicForm: React.SFC<BasicFormProps> = (props): JSX.Element => {
  const [postData, setValue] = useState<BasicFormProps>({
    canSkip:true,
    aspect:[],
    type:'single',
    title:'',
    item:[]
  });
  const [subjcetSchma,setSubjcetSchma] = useState<subjcetSchma[]>([]);
  const [editBoxVisible,setEditBoxVisible] = useState(false);
  // console.log(postData);
  
  const formChange = (values: BasicFormProps): void => {
    setValue({
      canSkip:values['skip'],
      aspect:[],
      type:values['type'],
      title:values['subjectItemTitle'],
      item:postData.item.map((v,i)=>({
        key:v.key,
        text:values['subjectItem'+(i+1)],
        value:values['subjectItemValue'+(i+1)]
      }))
    });
  };

  const onSubmit = (values: BasicFormProps, errors: []): void => {
    if (errors) {
      console.log('errors', errors);
      return;
    }
    console.log('values:', values);
    const newValue = [
      ...subjcetSchma,
      {
        ...postData
      }
    ];
    setSubjcetSchma(newValue)
    Message.success('提交成功');
    onClose();
  };

  const addSubject = ()=>{
    setEditBoxVisible(true);
    setValue({
      canSkip:true,
      aspect:[],
      type:'single',
      title:'',
      item:[]
    });
  }

  const addItem = ()=>{
    setValue({
      ...postData,
      item:[
        ...postData.item,
        {
          key: new Date().getTime(),
          text:'',
          value:0
        }
      ]
    })
  }

  const delItem = (i)=>()=>{
    const newSubjectItem = [
      ...postData.item
    ];
    newSubjectItem.splice(i,1)
    setValue({
      ...postData,
      item:[
        ...newSubjectItem
      ]
    })
  }

  const onClose = ()=>{
    setEditBoxVisible(false);
  }

  return (
    <Card free>
      <Card.Content>
        <Box spacing={20} direction="row">
          <div>
            <div className="preview">
              {subjcetSchma.map((v,vi)=>(
                <div key={vi}>
                  <h1>{vi + 1}、 {v.canSkip?'':<span style={{color:'red'}}>*</span>}{v.title}<span style={{color:'red'}}>【{v.type=='single'?'单选':(v.type=='double'?'多选':'填空')}】</span></h1>
                  {v.item.map((v1,vindex1)=>(
                    <p key={vindex1}>    {vindex1 + 1}、 {v1.text}</p>
                  ))}
                </div>
              ))}
            </div>
            <Button onClick={addSubject} type="primary" style={{marginBottom:'10px'}}>添加题目</Button>
          </div>
          <Drawer
            title="编辑题目"
            width={480}
            placement="right"
            visible={editBoxVisible}
            onClose={onClose}>
            <Form
              className={styles.BasicForm}
              responsive
              fullWidth
              value={postData}
              labelAlign="top"
              onChange={formChange}
            >
              <FormItem {...formItemLayout} label="题目名称：" required requiredMessage="必填" defaultValue={postData.title}>
                <Input placeholder="请输入题目名称" name="subjectItemTitle" />
              </FormItem>
              <FormItem {...formItemLayout} label="题目类型：" >
              <Radio.Group name="type"defaultValue={postData.type} >
                  <Radio id="single" value="single">单选</Radio>
                  <Radio id="double" value="double">多选</Radio>
                  <Radio id="double" value="freetxt">填空</Radio>
                </Radio.Group>
              </FormItem>
              <FormItem {...formItemLayout} label="其他:">
                    <Checkbox name="skip" checked={postData.canSkip}>可跳过</Checkbox>
              </FormItem>
              {/* <Divider dashed /> */}
              {postData.item.map((v,i)=>{
                return (
                  <FormItem {...formItemLayout} label={'选项'+(i + 1)+'：'} key={v.key}>
                    <Input placeholder="请输入选项" name={"subjectItem"+(i+1)} value={v.text}/>
                    <NumberPicker  placeholder="请输入分值" name={"subjectItemValue"+(i+1)} defaultValue={v.value}/>
                    <Button onClick={delItem(i)} type="primary">删除</Button>
                  </FormItem>
                )
              })}
              
              <FormItem colSpan={12}>
                <Button onClick={addItem} type="primary">增加选项</Button>
              </FormItem>
              <FormItem colSpan={12}>
                <Box spacing={8} direction="row">
                  <Form.Submit
                    type="primary"
                    onClick={onSubmit}
                    validate
                  >确定</Form.Submit>
                </Box>
              </FormItem>
            </Form>
          </Drawer>
            {/*

            <FormItem {...formItemLayout} label="项目描述：" >
              <Input.TextArea placeholder="请输入项目详细信息" name="desc" />
            </FormItem> */}
        </Box>
      </Card.Content>
    </Card>
  );
};

export default BasicForm;
