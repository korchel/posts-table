import clsx from 'clsx';
import React, { type DetailedHTMLProps, type InputHTMLAttributes } from 'react';

interface IInputImageProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  name: string,
  handleChange: (e: React.ChangeEvent) => void;
  value: string;
}

const InputImage: React.FC<IInputImageProps> = ({ value, name, handleChange, className }) => {
  // const [image, setImage] = useState<string>();

  // const handleChange: ChangeEventHandler<HTMLInputElement> = (e): void => {
  //   console.log(e.target.files?.[0]);
  // };
  return (
    <div className={clsx('inputImage', className)} >
      <label htmlFor={name}>
        U+2731 Логотип (jpeg, png)
        <input value={value} id={name} name={name} type="file" accept="image/png, image/jpeg" onChange={handleChange}/>
        <img className='background' />
      </label>
      <button type="button"><img src='./icons/closeButton.svg'/></button>
    </div>
  );
};

export default InputImage;
