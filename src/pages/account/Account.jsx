import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProjectImg from "../../assets/logo1.png";
import logo from "../../assets/logo3.png";
import "./Account.css";
import { CloseOutlined } from "@ant-design/icons";
import { RightOutlined } from '@ant-design/icons';
import { Modal, Button } from 'react-bootstrap';


function Settings() {
  const [showTeamForm, setShowTeamForm] = useState(false);
  const [showUsernameForm, setShowUsernameForm] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos =
        document.documentElement.scrollTop || document.body.scrollTop;
      setIsScrollingUp(prevScrollPos < currentScrollPos);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  const toggleTeamForm = () => {
    setShowTeamForm(!showTeamForm);
  };

  const toggleUsernameForm = () => {
    setShowUsernameForm(!showUsernameForm);
  };

  const toggleEmailForm = () => {
    setShowEmailForm(!showEmailForm);
  };

  const toggleDeleteConfirmation = () => {
    setShowDeleteConfirmation(!showDeleteConfirmation);
  };

  const handleUpdate = () => {
    console.log("Updating...");
  };

  const handleAdd = () => {
    console.log("Adding...");
  };

  const handleDelete = () => {
    console.log("Deleting...");
    setShowDeleteConfirmation(false);
  };

  const handleEmail = () => {
    console.log("email...");
  };

  const handleDeleteTeam = () => {
    console.log("Deleting team...");
  };

  return (
    <div
      style={{ maxWidth: "100%", overflowX: "hidden", paddingBottom: "5rem" }}
    >
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          backgroundColor: "#111111",
        }}
        className="flex cursor-pointer justify-between px-1 pt-2 tracking-wide"
      >
        <div className=" ">
          <div>
            <Link to="/">
              <img id="logo-img-login-acct" alt="logo" src={logo} />
            </Link>
          </div>

          {/* {!isScrollingUp && (
            <div className='pt-2.5 text-lg  capitalize tracking-wide'>
              Project
            </div>
          )} */}
        </div>

        {isScrollingUp && (
            <div className="pt-4 text-base  capitalize tracking-wide">
             Account
            </div>
          )}

        <div className="flex gap-0 text-white">
          {/* {!isScrollingUp && (
            <div className="pt-4 text-base  capitalize tracking-wide">
              Payment Plans
            </div>
          )} */}

          <div className="pt-1.5">
            <Link href="/">
              <img
                src={ProjectImg}
                alt="Profile Icon"
                className="logo-img-login-acct-prfl"
              />
            </Link>
          </div>
        </div>
      </nav>

      <div
        className="text-center "
        style={{
          maxWidth: "976px",
          margin: "0 auto",
          padding: "0 20px",
          marginTop: "7rem",
        }}
      >
          {!isScrollingUp && (
        <div className="relative  pb-10 text-center align-baseline text-xl font-semibold  capitalize tracking-wide  text-white">
          Account Settings
        </div>
          )}
        <div
          className="relative mb-4 flex justify-between rounded-lg border-none bg-zinc-700 px-4 py-2 tracking-wide"
          role="alert"
        >
          <div className="pt-2 pb-2 text-base capitalize text-white">
            Profile
          </div>
          <div className="pt-1 transition-transform duration-150 ease-out hover:scale-105 text-lg text-white font-semibold custm-color-acct underline cursor-pointer underline-offset-2 subpixel-antialiased shadow-gray-950">
            Edit
          </div>
          
        </div>

        <div
          className="relative custm-top-pstn flex justify-between rounded-lg border-none bg-zinc-700 px-4 py-2 tracking-wide"
          role="alert"
        >
          {!showEmailForm && (
            <>
              <div className="pt-2 pb-2 text-base capitalize text-white">
                Email Id
              </div>
              <div
                className="pt-1 transition-transform duration-150 ease-out hover:scale-105 text-lg text-white  font-semibold custm-color-acct underline cursor-pointer underline-offset-2 subpixel-antialiased shadow-gray-950"
                onClick={toggleEmailForm}
              >
                Update
              </div>
            </>
          )}

          {showEmailForm && (
            <div className="flex items-center justify-between  tracking-wide text-stone-600  ">
              <div className="justify-items-start">
                <div className="pt-2 pb-1 text-start  text-base capitalize text-white">
                  Email Id
                </div>
                <div className="pb-3">
                  <input
                    className="input-lg-acct rounded-lg py-2 pl-2 pr-1 "
                    placeholder="example@email.com"
                  />
                </div>
              </div>

              <div className="flex pl-20 pt-3">
                <div className="pl-10">
                  <div
                    onClick={toggleEmailForm}
                    className="cursor-pointer text-base text-white"
                  >
                    <CloseOutlined className="text-cus-cncel font-semibold transition-transform duration-150 ease-out hover:scale-105" />
                  </div>
                </div>

                <div className="pl-5 pt-1">
                  <div
                    className="transition-transform duration-150 ease-out hover:scale-105 text-lg text-white font-semibold custm-color-acct underline cursor-pointer underline-offset-2 subpixel-antialiased shadow-gray-950"
                    onClick={handleEmail}
                  >
                    Update
                  </div>
                </div>
              </div>
            </div>
          )}
 </div>



<div
          className="relative custm-top-pstn flex justify-between rounded-lg border-none bg-zinc-700 px-4 py-2 tracking-wide"
          role="alert"
        >
          {!showUsernameForm && (
            <>
              <div className="pt-2 pb-2 text-base capitalize text-white">
              Username
              </div>
              <div
                className="pt-1 transition-transform duration-150 ease-out hover:scale-105 text-lg text-white  font-semibold custm-color-acct underline cursor-pointer underline-offset-2 subpixel-antialiased shadow-gray-950"
                onClick={toggleUsernameForm}
              >
                Update
              </div>
            </>
          )}

          
       {showUsernameForm && (
            <div className="flex items-center justify-between cursor-pointer tracking-wide text-stone-600  ">
              <div className="justify-items-start">
                <div className="pt-2 pb-1 text-start  text-base capitalize text-white">
                Username
                </div>
                <div className="pb-3">
                  <input
                    className="input-lg-acct rounded-lg py-2 pl-2 pr-1 "
                    placeholder="example@email.com"
                  />
                </div>
              </div>

              <div className="flex pl-20 pt-3">
                <div className="pl-10">
                  <div
                    onClick={toggleUsernameForm}
                    className="cursor-pointer text-base text-white"
                  >
                    <CloseOutlined className="text-cus-cncel font-semibold transition-transform duration-150 ease-out hover:scale-105" />
                  </div>
                </div>

                <div className="pl-5 pt-1">
                  <div
                    className="transition-transform duration-150 ease-out hover:scale-105 text-lg text-white font-semibold custm-color-acct underline cursor-pointer underline-offset-2 subpixel-antialiased shadow-gray-950"
                    onClick={handleUpdate}
                  >
                    Update
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>


        <div
          className="relative custm-top-pstn flex cursor-pointer justify-between rounded-lg border-none bg-zinc-700 px-4 py-2 tracking-wide"
          role="alert"
        >
          <div className="pt-2 pb-2 text-base capitalize text-white">
          Payment Plans
          </div>
          <div className="pt-1  transition-transform duration-150 ease-out hover:scale-105 text-lg text-white font-semibold text underline cursor-pointer underline-offset-2 subpixel-antialiased shadow-gray-950">
          <RightOutlined className="text-stone-300 pr-1"/>
          </div>
        </div>


        <div
          className="relative custm-top-pstn flex cursor-pointer justify-between rounded-lg border-none bg-zinc-700 px-4 py-2 tracking-wide"
          role="alert"
        >
          <div className="pt-2 pb-2 text-base capitalize text-white">
       Notifications
          </div>
          <div className="pt-1  transition-transform duration-150 ease-out hover:scale-105 text-lg text-white font-semibold text underline cursor-pointer underline-offset-2 subpixel-antialiased shadow-gray-950">
          <RightOutlined className="text-stone-300 pr-1"/>
          </div>
        </div>


        <div
          className="relative custm-top-pstn-delet cursor-pointer flex justify-between rounded-lg border-none bg-zinc-700 px-4 py-2 tracking-wide"
          role="alert"
        >

{!showDeleteConfirmation && (
            <>
              <div className=" flex-col justify-items-start pt-2">
                <div className="pt-2 text-start text-red-500 text-lg capitalize">
                  Delete My Account
                </div>
                <div className=" text-start  text-xs capitalize text-white pb-4">
                  Deleting account will permanently <br></br> delete all data and you
                  cannot retrieve it.
                </div>
              </div>
              <div className="mt-cutm-btn">
                <div
                  className="rounded-md border-none bckgrnd-col px-4  transition-transform duration-150 ease-out hover:scale-105 text-lg text-white py-2 text-base text-white shadow-lg shadow-gray-950"
                  onClick={toggleDeleteConfirmation}
                >
                  Delete 
                </div>
              </div>
            </>
          )}

          {showDeleteConfirmation && (
            <>
              <div className=" flex-col justify-items-start pt-2">
                <div className="pt-2 text-start text-red-500 text-lg capitalize">
                  Delete My Account
                </div>
                <div className=" text-start  text-xs capitalize text-white pb-4">
                  Deleting account will permanently <br></br> delete all data and you
                  cannot retrieve it.
                </div>
              </div>
              <div className="mt-cutm-btn">
                <div
                  className="rounded-md border-none bckgrnd-col px-4  transition-transform duration-150 ease-out hover:scale-105 text-lg text-white py-2 text-base text-white shadow-lg shadow-gray-950"
                  onClick={toggleDeleteConfirmation}
                >
                  Delete 
                </div>
              </div>
            </>
          )}

<Modal show={showDeleteConfirmation} onHide={toggleDeleteConfirmation} className="mt-40 mobile-modal">
        <Modal.Header >
          <Modal.Title  className="pt-2 text-start text-red-500 text-lg capitalize">Delete Account</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center text-base  text-stone-600">
          <p>Are you sure you want to delete your account?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDelete}>
            Yes, Delete
          </Button>
          <Button variant="secondary" onClick={toggleDeleteConfirmation}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
        </div>
      </div>
    </div>
  );
}

export default Settings;
