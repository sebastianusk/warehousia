import { ApolloError, useMutation } from '@apollo/client';
import { message } from 'antd';
import { FormInstance, useForm } from 'antd/lib/form/Form';
import { CHANGE_PASSWORD } from '../../graph';

interface AccountState {
  loading: boolean;
  onSubmit(values: {
    oldPass: string;
    newPass: string;
    confirmPass: string;
  }): void;
  contextHolder: React.ReactElement;
  form: FormInstance;
}

export default function useAccountPageHooks(): AccountState {
  const [form] = useForm();
  const [changePassword, { loading }] = useMutation(CHANGE_PASSWORD);
  const [messageApi, contextHolder] = message.useMessage();

  const onSubmit = (values: {
    oldPass: string;
    newPass: string;
    confirmPass: string;
  }) => {
    if (values.oldPass && values.newPass) {
      changePassword({
        variables: {
          input: { oldPassword: values.oldPass, newPassword: values.newPass },
        },
      }).then(() => {
        console.log('heye');
        form.resetFields();
        messageApi.info('Successfully Change Password');
      });
    }
  };
  return {
    loading,
    onSubmit,
    contextHolder,
    form,
  };
}
