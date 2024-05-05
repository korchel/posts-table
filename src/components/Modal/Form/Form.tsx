import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import TextInput from './components/TextInput';
import FileInput from './components/FileInput';
import SelectInput from './components/SelectInput';
import Button from '../../Button';
import { fetchData } from '../../../store/dataSlice';
import { useDispatch } from 'react-redux';
import { type AppDispatchType } from '../../../store';
import { closeModal } from '../../../store/modalSlice';

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
      console.log(values);
      dispatch(fetchData());
      dispatch(closeModal());
    }
  });
  return (
    <form className="grid grid_mt" onSubmit={handleSubmit}>
      <TextInput handleChange={handleChange} mask="" value={values.company} name="company" label='Название организации' required error={errors.company} touched={touched.company} />
      <FileInput setFieldValue={setFieldValue} className="grid__row3" name="logo" error={errors.logo} touched={touched.logo} />
      <TextInput handleChange={handleChange} mask="+7 999 999 99 99" value={values.phone} name="phone" label='Телефон' required error={errors.phone} touched={touched.phone} />
      <TextInput handleChange={handleChange} mask="" value={values.eMail} name="eMail" label='E-mail' required error={errors.eMail} touched={touched.eMail} />
      <SelectInput setFieldValue={setFieldValue} className="grid__col2" value={values.field} name="field" label='Направление' required error={errors.field} touched={touched.field} />
      <TextInput handleChange={handleChange} className="grid__col2" mask="" value={values.webSite} name="webSite" icon="globe" />
      <TextInput handleChange={handleChange} className="grid__col2" mask={`vk.com/${'a'.repeat(50)}`} value={values.vk} name="vk" icon="vk" />
      <TextInput handleChange={handleChange} className="grid__col2" mask={`ok.com/${'a'.repeat(50)}`} value={values.ok} name="ok" icon="ok" />
      <TextInput handleChange={handleChange} className="grid__col2" mask={`f\\acebook.com/${'a'.repeat(50)}`} value={values.fb} name="fb" icon="fb" />
      <TextInput handleChange={handleChange} className="grid__col2" mask={`inst\\agr\\am.com/${'a'.repeat(50)}`} value={values.ig} name="ig" icon="ig" />
      <TextInput handleChange={handleChange} className="grid__col2" mask={`youtube.com/${'a'.repeat(50)}`} value={values.yt} name="yt" icon="yt" />
      <TextInput handleChange={handleChange} className="grid__col2" mask="" value={values.name} name="name" label="Руководитель" />
      <div className="grid__col2" >
        <Button type="submit" colorType="primary">Стать партнёром проекта</Button>
        <Button onClick={() => dispatch(closeModal())}>Отменить</Button>
      </div>
    </form>
  );
};

export default Form;
