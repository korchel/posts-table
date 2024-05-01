import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import InputField from './InputField';
import FileInput from './FileInput';
import Button from '../Button';
import { fetchData } from '../../store/dataSlice';
import { useDispatch } from 'react-redux';
import { type AppDispatchType } from '../../store';
import { closeModal } from '../../store/modalSlice';

const validationSchema = Yup.object().shape({
  company: Yup.string().required('Обязательное поле'),
  phone: Yup.string().required('Обязательное поле'),
  eMail: Yup.string().required('Обязательное поле'),
  logo: Yup.mixed().required('Обязательное поле'),
  field: Yup.string().required('Обязательное поле'),
});

const Form: React.FC = () => {
  const dispatch = useDispatch<AppDispatchType>();

  const { handleSubmit, handleChange, values, setFieldValue, errors, touched } = useFormik({
    initialValues: {
      company: '',
      phone: '',
      eMail: '',
      logo: '',
      field: '',
      webSite: '',
      vk: '',
      ok: '',
      fb: '',
      ig: '',
      yt: '',
      name: '',
    },
    validationSchema,
    onSubmit: (values) => {
      const data = new FormData();
      console.log(data);
      dispatch(fetchData());
      dispatch(closeModal());
    }
  });
  return (
    <form className="form" onSubmit={handleSubmit}>
      <InputField handleChange={handleChange} mask="" value={values.company} name="company" label='Название организации' required />
      <InputField handleChange={handleChange} mask="" value={values.phone} name="phone" label='Телефон' required />
      <InputField handleChange={handleChange} mask="" value={values.eMail} name="eMail" label='E-mail' required />
      <FileInput setFieldValue={setFieldValue} name="logo" error={errors.logo} touched={touched.logo} />
      <InputField handleChange={handleChange} mask="" value={values.field} name="field" label='Направление' required select />
      <InputField handleChange={handleChange} mask="" value={values.webSite} name="webSite" icon="globe" />
      <InputField handleChange={handleChange} mask="vk.com/" value={values.vk} name="vk" icon="vk" />
      <InputField handleChange={handleChange} mask="ok.com/" value={values.ok} name="ok" icon="ok" />
      <InputField handleChange={handleChange} mask="facebook.com/" value={values.fb} name="fb" icon="fb" />
      <InputField handleChange={handleChange} mask="instagram.com/" value={values.ig} name="ig" icon="ig" />
      <InputField handleChange={handleChange} mask="youtube.com/" value={values.yt} name="yt" icon="yt" />
      <InputField handleChange={handleChange} mask="" value={values.name} name="name" label="Руководитель" />
      <div>
        <Button type="submit" colorType='primary'>Стать партнёром проекта</Button>
        <Button onClick={() => dispatch(closeModal())}>Отменить</Button>
      </div>
    </form>
  );
};

export default Form;
