"use client"
import React, { FormEvent, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { MutatingDots } from 'react-loader-spinner';
import { ModalContact } from './ModalContact';

export const ContactForm = ({ namePlaceholder, emailPlaceholder, messagePlaceholder, actionButton, errorNameRequired, errorEmail, errorMessage, success, errorGlobal }: any) => {

  // errors
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [messageError, setMessageError] = useState("");

  // important to send messages
  const [allowedMessages, setallowedMessages] = useState(2);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  // modal 
  const [openModal, setopenModal] = useState(false);
  const [modalMessage, setmodalMessage] = useState("");
  const [modalType, setmodalType] = useState(0);


  // form values
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const form: any = useRef(null);

  const evaluateName = (value: string) => {

    const name = value;

    if (name.length === 0) {
      setNameError(errorNameRequired);
    };

    if (name.length > 50) {
      setNameError("The name is too long!");
    };

    if (name.length > 0 && name.length <= 50) {
      setNameError("");
    }

    setName(name);

  }

  const evaluateEmail = (value: string) => {

    const email = value;
    let EmailRegexValidator = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!EmailRegexValidator.test(email.toString().toLowerCase())) {
      setEmailError(errorEmail);
    } else {
      setEmailError("");
    };

    setEmail(email);

  }

  const evaluateMessage = (value: string) => {

    const message = value;

    if (message.length < 10) {
      setMessageError(errorMessage);
    } else {
      setMessageError("");
    }

    setMessage(message);

  }

  const sendEmail = (e: FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    setIsLoading(true);
    setopenModal(false);

    if (sendingMessage) {
      return;
    }

    if (allowedMessages <= 0) {
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('message', message);

    // validate all the fields
    if (message.length === 0 || name.length === 0 || email.length === 0) {
      setIsLoading(false);
      return;
    }

    if (messageError !== "" || nameError !== "" || emailError !== "") {
      setIsLoading(false);
      return;
    }

    if (allowedMessages <= 0) {
      setIsLoading(false);
      return;
    }

    setSendingMessage(true);

    setallowedMessages(allowedMessages - 1);

    setTimeout(() => {

      emailjs.sendForm('service_ljreywj', 'template_12scdup', form.current, 'BDIxeZDcmcXTCdO5z')
        .then((result: any) => {
          setSendingMessage(false);
          //set form values to empty
          setName("");
          setEmail("");
          setMessage("");
          //set the errors to empty
          setNameError("");
          setEmailError("");
          setMessageError("");
          //set other important variables
          setIsLoading(false);
          // modal actions
          setopenModal(true);
          setmodalType(1);
          setmodalMessage(success);
        }, (error: any) => {
          setSendingMessage(false);
          setIsLoading(false);
          // modal actions
          setopenModal(true);
          setmodalType(0);
          setmodalMessage(errorGlobal);
        });


    }, 1000);

  }

  return (

    <>

      <div className={`${isLoading ? "" : "hidden"} flex items-center justify-center w-full`}>
        <MutatingDots
          visible={true}
          height="100"
          width="100"
          color="#fef08a"
          secondaryColor="#fef08a"
          radius="12.5"
          ariaLabel="mutating-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""

        />
      </div>

      {
        openModal &&
        <ModalContact
          type={modalType}
          message={modalMessage}
          setopenModal={setopenModal}
        />
      }

      <form ref={form} onSubmit={sendEmail} className={`${isLoading ? "hidden" : ""} w-full sm:px-[10%] lg:px-[20%] 2xl:px-[25%] pb-[12rem]`}>

        <div>

          <input
            type="text"
            placeholder={namePlaceholder}
            name='name'
            value={name}
            onChange={(e) => evaluateName(e.target.value)}
            className={`${(nameError !== "") ? "border-2 border-red-500" : ""} w-full mt-8 py-3 px-4 bg-[#281706] text-white`}
          />

          {nameError && <p className='text-red-500 text-lg'>{nameError}</p>}

        </div>


        <div>

          <input
            type="email"
            placeholder={emailPlaceholder}
            name='email'
            value={email}
            onChange={(e) => evaluateEmail(e.target.value)}
            className={`${(emailError !== "") ? "border-2 border-red-500" : ""} w-full mt-8 py-3 px-4 bg-[#281706] text-white`}
          />

          {emailError && <p className='text-red-500 text-lg'>{emailError}</p>}

        </div>

        <div>

          <textarea
            name="message"
            rows={"5" as any}
            placeholder={messagePlaceholder}
            value={message}
            onChange={(e) => evaluateMessage(e.target.value)}
            className={`${(messageError !== "") ? "border-2 border-red-500" : ""} w-full mt-8 py-3 px-4 bg-[#281706] text-white`}>

          </textarea>

          {messageError && <p className='text-red-500 text-lg'>{messageError}</p>}

        </div>

        <button
          type='submit'
          className='mt-8 w-full flex items-center justify-center bg-yellow-200 py-4 px-5 text-lg font-bold text-[#0F193B] hover:bg-yellow-300 transition-all'
        >
          {actionButton}
        </button>

      </form>

    </>

  )
}
