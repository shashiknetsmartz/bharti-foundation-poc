import { InboxOutlined } from '@ant-design/icons';
import { message, Upload, notification } from 'antd';

import dropDownImg from '../../assets/images/dropDownImage.svg'
const { Dragger } = Upload;
const props = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
        } else if (status === 'error') {
            notification['success']({description: `${info.file.name} file uploaded successfully.`})
            // message.error(`${info.file.name} file upload failed.`);
        }
    },
    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
    },
};
const DragAndDrop = () => (
    <Dragger {...props}>
        <p className="ant-upload-drag-icon">
            <img src={dropDownImg} />
        </p>
        <p className="ant-upload-text">Upload or Drag & Drop</p>
    </Dragger>
);
export default DragAndDrop;