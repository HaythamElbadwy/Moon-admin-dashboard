import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import styles from './Notifications.module.css';
import { toast } from 'react-toastify';
import { data } from 'autoprefixer';

export default function Notifications() {
  const [allNotifications, setAllNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowPopupAdd, setIsShowPopupAdd] = useState(false);
  const [isShowPopupDelete, setIsShowPopupDelete] = useState(false);
  const [isShowPopupEdite, setIsShowPopupEdite] = useState(false);
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [expireAt, setExpireAt] = useState();
  const [notificationsId, setNotificationsId] = useState();


  function openPopupAdd() {
    setIsShowPopupAdd(true)
  }

  function openPopupDelete(notificationsId) {
    setIsShowPopupDelete(true);
    setNotificationsId(notificationsId);
  }

  function openPopupEdite(data) {
    setIsShowPopupEdite(true)
    setTitle(data.title);
    setContent(data.desc);
    setExpireAt(data.expireAt);
    setNotificationsId(data._id)
  }

  //////////////////////////START ADD NOTIFICATIONS//////////////////////
  const addNotifications = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`https://moon-smy9.onrender.com/notification/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `moonOM0${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({ title, desc: content, expireAt })
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message, {
          theme: 'dark'
        })
        setIsShowPopupAdd(false)
        clearInput()
        getNotifications()
      } else {
        switch (response.status) {
          case 500:
            toast.error(data.message, {
              theme: "dark"
            });
            break;
          default:
            toast('An error occurred. Please try again.', {
              theme: 'dark'
            });
        }
      }

    } catch (err) {
      console.error("Error Saving Notifications:", err);
    } finally {
      setIsLoading(false)
    }
  };

  function handleAdd() {
    if (title == '' || content == '' || expireAt == '') {
      toast.error("All faildes is Rquired!", {
        theme: 'dark'
      })
    } else {
      addNotifications()

    }
  }
  function clearInput() {
    setTitle('');
    setContent('');
    setExpireAt('');
  }
  /////////////////////////////END ADD NOTIFICATIONS/////////////////////////////

  /////////////////////// START GET NOTIFICATIONS FUNCTION////////////////
  const getNotifications = async () => {

    try {
      const response = await fetch(`https://moon-smy9.onrender.com/notification/get`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        setAllNotifications(data.notifications);
      } else {
        switch (response.status) {
          case 500:
            toast.error(data.message, {
              theme: "dark"
            });
          case 404:
            toast.error(data.message, {
              theme: "dark"
            });
            break;
          default:
            toast('An error occurred. Please try again.');
        }
      }

    } catch (err) {
      console.error("Error Saving Content:", err);
    } finally {
      setIsLoading(false)
    }
  };

  useEffect(() => {
    getNotifications()
  }, [])



  /////////////////////// END GET NOTIFICATIONS FUNCTION////////////////

  //////////////////////START EDITE NOTIFICATIONS///////////////////////////////

  const editeNotifications = async (id) => {
    setIsLoading(true)
    try {
      const response = await fetch(`https://moon-smy9.onrender.com/notification/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `moonOM0${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({ title, desc: content, expireAt })
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message, {
          theme: 'dark'
        })
        setIsShowPopupEdite(false)
        clearInput()
        getNotifications()
      } else {
        switch (response.status) {
          case 500:
            toast.error(data.message, {
              theme: "dark"
            });
            break;
          default:
            toast('An error occurred. Please try again.', {
              theme: 'dark'
            });
        }
      }

    } catch (err) {
      console.error("Error Saving Notifications:", err);
    } finally {
      setIsLoading(false)
    }
  };


  function hundleUpdate() {
    if (title == '' || content == '' || expireAt == '') {

      toast("All faildes is Rquired!")
    } else {
      editeNotifications(notificationsId)

    }
  }

  //////////////////END EDITE NOTIFICATIONS//////////////////////////////

  /////////////////START DELETE NOTIFICATIONS////////////////////////////

  const deleteNotificatons = async (id) => {
    setIsLoading(true)
    try {
      const response = await fetch(`https://moon-smy9.onrender.com/notification/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `moonOM0${localStorage.getItem('authToken')}`
        },
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message, {
          theme: 'dark'
        })
        setIsShowPopupDelete(false)
        getNotifications()
      } else {
        switch (response.status) {
          case 500:
            toast.error(data.message, {
              theme: "dark"
            });
            break;
          default:
            toast('An error occurred. Please try again.');
        }
      }

    } catch (err) {
      console.error("Error Saving Notifications:", err);
    } finally {
      setIsLoading(false)
    }
  };
  function handleDelete() {
    deleteNotificatons(notificationsId)
  }
  //////////////////////END DELETE NOTIFICATIONS//////////////////////////

  return (
    <>
      <section>
        <div className={`${styles.dashboard_options} mt-20 flex items-center justify-around`}>
          <h1 className='font-semibold text-[20px]'>Notifications</h1>
          <div className='flex justify-end pr-9'>
            <button type="button" onClick={openPopupAdd} className="text-[#B5A5C9] hover:text-white border border-[#B5A5C9] hover:bg-[#B5A5C9] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">
              <i className="fa-solid fa-plus mr-2"></i>Add Notifications</button>
          </div>
        </div>
        <div className={`${styles.notifications_table} `}>
          <table className='table-auto w-full '>
            <thead className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 '>
              <tr>
                <th scope="col" className="px-6 py-3">Title</th>
                <th scope="col" className="px-6 py-3">Content</th>
                <th scope="col" className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allNotifications.map((item, index) => (


                <tr key={index}>
                  <td scope="col" className="px-6 py-4">{item.title}</td>
                  <td scope="col" className="px-6 py-3">{item.desc}</td>
                  <td scope="col" className="px-6 py-3">
                    <i onClick={() => openPopupEdite(item)} className="fa-solid fa-pen mx-1 text-blue-500 cursor-pointer"></i>
                    <i onClick={() => openPopupDelete(item._id)} className="fa-solid fa-trash text-red-500 cursor-pointer"></i>
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </section>
      {isShowPopupAdd ?
        <div id="popup-modal" tabindex="-1" className="fixed backdrop-blur-sm z-[9999] top-0 left-0 right-0 flex justify-center items-center w-full h-screen bg-black bg-opacity-50 ">
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  ADD NOFTIFICATIONS
                </h3>
                <button type="button" onClick={() => setIsShowPopupAdd(false)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              <div className="p-4 md:p-5">
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <label htmlFor="title" className="flex mb-2  font-medium text-gray-900 dark:text-white">Title</label>
                    <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} name="title" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type Title" />
                  </div>

                  <div className="col-span-2">
                    <label htmlFor="content" className="flex mb-2  font-medium text-gray-900 dark:text-white">Content</label>
                    <input type="text" onChange={(e) => setContent(e.target.value)} value={content} name="content" id="content" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type Content" />
                  </div>
                </div>
                <div className="col-span-2">
                  <label htmlFor="expireAt" className="flex mb-2  font-medium text-gray-900 dark:text-white">Date</label>
                  <input type="date" onChange={(e) => setExpireAt(e.target.value)} value={expireAt} name="expireAt" id="expireAt" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" />
                </div>

                <button type="submit" onClick={handleAdd} className="mt-2 text-white inline-flex items-center bg-[#B5A5C9] hover:bg-[#B5A5C9] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-800 dark:focus:ring-blue-800">
                  {isLoading ?
                    <i className='fas fa-spinner fa-spin text-2xl'></i>
                    : 'Save'}

                </button>
              </div>
            </div>
          </div>
        </div>
        : ''}

      {isShowPopupEdite ?
        <div id="popup-modal" tabindex="-1" className="fixed backdrop-blur-sm z-[9999] top-0 left-0 right-0 flex justify-center items-center w-full h-screen bg-black bg-opacity-50 ">
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  ADD NOFTIFICATIONS
                </h3>
                <button type="button" onClick={() => setIsShowPopupEdite(false)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              <div className="p-4 md:p-5">
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <label htmlFor="title" className="flex mb-2  font-medium text-gray-900 dark:text-white">Title</label>
                    <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} name="title" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type Title" />
                  </div>

                  <div className="col-span-2">
                    <label htmlFor="content" className="flex mb-2  font-medium text-gray-900 dark:text-white">Content</label>
                    <input type="text" onChange={(e) => setContent(e.target.value)} value={content} name="content" id="content" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type Content" />
                  </div>
                </div>
                <div className="col-span-2">
                  <label htmlFor="expireAt" className="flex mb-2  font-medium text-gray-900 dark:text-white">Date</label>
                  <input type="date" onChange={(e) => setExpireAt(e.target.value)} value={expireAt} name="expireAt" id="expireAt" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" />
                </div>

                <button type="submit" onClick={hundleUpdate} className="mt-2 text-white inline-flex items-center bg-[#B5A5C9] hover:bg-[#B5A5C9] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-800 dark:focus:ring-blue-800">
                  {isLoading ?
                    <i className='fas fa-spinner fa-spin text-2xl'></i>
                    : 'Edite'}

                </button>
              </div>
            </div>
          </div>
        </div>
        : ''}
      {isShowPopupDelete ?
        <div id="popup-modal" tabindex="-1" className="fixed backdrop-blur-sm z-[9999] top-0 left-0 right-0 flex justify-center items-center w-full h-screen bg-black bg-opacity-50 ">
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
              <button onClick={() => setIsShowPopupDelete(false)} type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-4 md:p-5 text-center">
                <h3 className="mb-5 text-lg font-normal text-black">Are you sure to delete this Notification?</h3>
                <div className='flex justify-center items-center'>
                  <button type="button" onClick={handleDelete}
                    className="text-[#B5A5C9] mx-4 hover:text-white border border-[#B5A5C9] hover:bg-[#B5A5C9] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">
                    {isLoading ?
                      <i className='fas fa-spinner fa-spin text-2xl'></i>
                      : 'Confirm'
                    }</button>
                  <button data-modal-hide="popup-modal" onClick={() => setIsShowPopupDelete(false)} type="button"
                    className="text-white mx-4 bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        : ''}
    </>
  )
}
