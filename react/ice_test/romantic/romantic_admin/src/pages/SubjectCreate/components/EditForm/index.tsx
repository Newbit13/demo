import React, { useState,JSX } from 'react';
import { Input, Form, Box, Button, Card, DatePicker, Message, Radio, Upload, Divider } from '@alifd/next';
import { useSetState } from 'ahooks';

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
  onCancel?: () => void;
}

const DEFAULT_DATA: DataSource = {
  type: 'private',
};

const DEFAULT_ON_SUBMIT = (values: BasicFormProps, errors: []): void => {
  if (errors) {
    console.log('errors', errors);
    return;
  }
  console.log('values:', values);
  Message.success('提交成功');
};

const BasicForm: React.SFC<BasicFormProps> = (props): JSX.Element => {
  const {
    dataSource = DEFAULT_DATA,
    onSubmit = DEFAULT_ON_SUBMIT,
    onCancel = () => { },
  } = props;

  const [postData, setValue] = useState<BasicFormProps>(dataSource);
  const [subjcetJson,setSubjectJson] = useSetState({});

  const formChange = (values: BasicFormProps): void => {
    console.log({values});
    setValue(values);
  };

  const sigleButton = ()=>{

  }

  const doubleButton = ()=>{

  }

  const addItem = ()=>{
    
  }

  return (
    <Card free>
      <Card.Content>
        <Box spacing={20} direction="row">
          <div>
            <Button onClick={sigleButton} type="primary" style={{marginBottom:'10px'}}>单选题</Button>
            <br />
            <Button onClick={doubleButton} type="primary">多选题</Button>
          </div>
          <Form
            className={styles.BasicForm}
            responsive
            fullWidth
            value={postData}
            labelAlign="top"
            onChange={formChange}
          >
            <FormItem {...formItemLayout} label="题目名称：">
              <Input placeholder="请输入题目名称" name="subjectItemTitle" />
            </FormItem>
            <Divider dashed />
            <FormItem {...formItemLayout} label="选项：">
              <Input placeholder="请输入选项" name="subjectItem" />
            </FormItem>
            <FormItem colSpan={12}>
              <Button onClick={addItem} type="primary" style={{marginBottom:'10px'}}>增加选项</Button>
            </FormItem>
            
            {/* <FormItem {...formItemLayout} label="项目权限：" >
              <Radio.Group name="type" aria-labelledby="authority of project">
                <Radio id="private" value="private">私密项目</Radio>
                <Radio id="internal" value="internal">内部项目</Radio>
                <Radio id="publish" value="publish">开放目</Radio>
              </Radio.Group>
            </FormItem>

            <FormItem {...formItemLayout} label="项目描述：" >
              <Input.TextArea placeholder="请输入项目详细信息" name="desc" />
            </FormItem> */}

            <FormItem colSpan={12}>
              <Box spacing={8} direction="row">
                <Form.Submit
                  type="primary"
                  onClick={onSubmit}
                  validate
                >确定</Form.Submit>
                <Button onClick={onCancel} type="secondary">取消</Button>
              </Box>
            </FormItem>
          </Form>
        </Box>
      </Card.Content>
    </Card>
  );
};

export default BasicForm;
