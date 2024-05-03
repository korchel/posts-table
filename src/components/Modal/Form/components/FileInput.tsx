/* eslint-disable @typescript-eslint/no-misused-promises */

import clsx from 'clsx';
import { type FormikErrors, type FormikValues } from 'formik';
import React, { useState, type ChangeEventHandler, type DetailedHTMLProps, type InputHTMLAttributes } from 'react';

import ErrorMessage from './ErrorMessage';

interface IFileInputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  name: string,
  setFieldValue: (field: string, value: File) => Promise<void> | Promise<FormikErrors<FormikValues>>,
  error: string | undefined,
  touched: boolean | undefined,
}

const getImageUrl = async (file: File): Promise<FileReader> => (
  await new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = () => { resolve(fileReader); };
    fileReader.onerror = (error) => { reject(error); };
    fileReader.readAsDataURL(file);
  })
);

const FileInput: React.FC<IFileInputProps> = ({ name, className, setFieldValue, error, touched }) => {
  const [image, setImage] = useState<string>('');

  const handleChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const src = await getImageUrl(file);
      if (typeof src.result === 'string') {
        setImage(src.result);
      }
      setFieldValue(name, file);
    }
  };

  const handleClick = (): void => {
    setImage('');
  };

  return (
    <div className={clsx('fileInput', className)} >
      <label htmlFor={name} className="inputContainer">
        <p className="label label_required">Логотип (jpeg, png)</p>
        <input
          id={name}
          name={name}
          type="file"
          accept="image/png, image/jpeg"
          onChange={(e) => { handleChange(e); }}
          className="inputContainer__input"
        />
        <img src={image} className={clsx('inputContainer__image', { inputContainer__image_bg: !image }, { inputContainer__image_error: error && touched })} />
        <img className="inputContainer__icon" src="./icons/file.svg" />
        <p className='inputContainer__text'>Выберите файл</p>
        <button
          className="inputContainer__button"
          type="button"
          onClick={handleClick}
        >
          <img src='./icons/closeButton.svg' />
        </button>
        {error && touched && <ErrorMessage error={error} />}
      </label>
    </div>
  );
};

export default FileInput;
