import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import InputField from './InputField';
import InputImage from './InputImage';
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

  const { handleSubmit, handleChange, values } = useFormik({
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
    onSubmit: () => {
      dispatch(fetchData());
      dispatch(closeModal());
    }
  });
  return (
    <form className="form" onSubmit={handleSubmit}>
      <InputField value={values.company} handleChange={handleChange} name="company" label='Название организации' required />
      <InputField value={values.phone} handleChange={handleChange} name="phone" label='Телефон' required />
      <InputField value={values.eMail} handleChange={handleChange} name="eMail" label='E-mail' required />
      <InputImage value={values.logo} handleChange={handleChange} name="logo" />
      <InputField value={values.field} handleChange={handleChange} name="field" label='Направление' required select />
      <InputField value={values.webSite} handleChange={handleChange} name="webSite" icon="globe" />
      <InputField value={values.vk} handleChange={handleChange} name="vk" icon="vk" />
      <InputField value={values.ok} handleChange={handleChange} name="ok" icon="ok" />
      <InputField value={values.fb} handleChange={handleChange} name="fb" icon="fb" />
      <InputField value={values.ig} handleChange={handleChange} name="ig" icon="ig" />
      <InputField value={values.yt} handleChange={handleChange} name="yt" icon="yt" />
      <InputField value={values.name} handleChange={handleChange} name="name" label="Руководитель" />
      <div>
        <Button type="submit" colorType='primary'>Стать партнёром проекта</Button>
        <Button onClick={() => dispatch(closeModal())}>Отменить</Button>
      </div>
      </form>
  );
};

export default Form;
