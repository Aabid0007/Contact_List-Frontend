import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getContactById, editContact } from '../../../../Redux/Reducer/GetData.Slice';
import "./EditContact.css";
import { getDataInfo } from '../../../../Redux/Reducer/GetData.Slice';
import { toast } from 'react-toastify';

const EditContact = ({ editModalClose, contactId }) => {
  const dispatch = useDispatch();
  const { currentPage, pageSize, searchQuery } = useSelector((state) => state.data);
  const { register, handleSubmit, setValue, watch, control, formState: { errors } } = useForm();
  const [imagePreview, setImagePreview] = useState(null);
  const watchedImage = watch('image');

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const actionResult = await dispatch(getContactById(contactId));
        const contactData = actionResult.payload;
        if (contactData) {
          setValue("firstName", contactData.firstName || '');
          setValue("lastName", contactData.lastName || '');
          setValue("email", contactData.email || '');
          setValue("phone", contactData.phone || '');
          setImagePreview(`https://contact-list-backend-1jwz.onrender.com/${contactData.image}`);
        }
      } catch (error) {
        console.error("Error fetching contact data:", error);
      }
    };

    fetchContactData();
  }, [contactId, dispatch, setValue]);


  useEffect(() => {
    if (watchedImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      if (watchedImage[0] instanceof File) {
        reader.readAsDataURL(watchedImage[0]);
      }
    } else {
      setImagePreview(null);
    }
  }, [watchedImage]);


  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("image", data.image[0]);
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      await dispatch(editContact({ id: contactId, data: formData }));

      dispatch(getDataInfo({ searchQuery, currentPage, pageSize }));
      editModalClose();
      toast.success('Contact Updated successfully!');
    } catch (error) {
      console.error("Error updating contact:", error);
      toast.error('Error updating contact. Please try again.');
    }
  };


  return (
    <div>
      <div className="AddForm">
        <div className='container'>
          <div className='AddContact'>
            <div className='closeFrom'><button className="close_btn" onClick={editModalClose}><i className="fa-solid fa-xmark"></i></button></div>
            <div className="FormSection">
              <div className="heading">
                <h2>Edit Contact</h2>
              </div>
              <div className="formContiner">
                <form id="formSection" onSubmit={handleSubmit(onSubmit)} noValidate>
                  <div className="FormContent">
                    <Controller
                      name="image"
                      control={control}
                      render={({ field: { onChange } }) => (
                        <div className='imageInput'>
                          <div className='avatar'>
                            <label htmlFor="image">
                              <h4>Image</h4>
                            </label>
                            <input
                              type="file"
                              id="image"
                              onChange={(e) => {
                                const file = e.target.files[0];
                                onChange(file);
                              }}
                              {...register("image")}
                              hidden
                            />
                            {imagePreview && (
                              <img
                                src={imagePreview}
                                alt="imagePreview"
                                className="imagePreview"
                              />
                            )}
                            <label htmlFor="image" className='addImage'>Change</label>
                            <p className="error">{errors.image?.message}</p>
                          </div>
                        </div>
                      )}
                    />
                    <label htmlFor="firstName">
                      <h4>First Name:</h4>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      className="inputBox"
                      placeholder="Enter First Name"
                      {...register("firstName", {
                        required: {
                          value: true,
                          message: "First Name is required",
                        }
                      })}
                    />
                    <p className='error'>{errors.firstName?.message}</p>

                    <label htmlFor="lastName">
                      <h4>Last Name:</h4>
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      className="inputBox"
                      placeholder="Enter Last Name"

                      {...register("lastName", {
                        required: {
                          value: true,
                          message: "Last Name is required",
                        }
                      })}
                    />
                    <p className='error'>{errors.lastName?.message}</p>

                    <label htmlFor="email">
                      <h4>Email:</h4>
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="inputBox"
                      placeholder="Enter email"

                      {...register("email", {
                        pattern: {
                          value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                          message: "Invalid email format",
                        },
                        required: "Email is required",
                      })}
                    />
                    <p className='error'>{errors.email?.message}</p>

                    <label htmlFor="phone">
                      <h4>Phone Number:</h4>
                    </label>
                    <input
                      type='tel'
                      id="phone"
                      className="inputBox"
                      placeholder="Enter phone number"
                      {...register("phone", {
                        required: {
                          value: true,
                          message: "Phone Number is required",
                        }
                      })}
                    />
                    <p className='error'>{errors.phone?.message}</p>
                  </div>
                  <div className='formSubmit'> <button type="submit" className="btn">
                    Save Changes
                  </button></div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='overlay'></div>
    </div>
  )
}

export default EditContact

