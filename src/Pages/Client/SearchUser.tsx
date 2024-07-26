import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../App/Store'
import { fetchSearchProfileById } from '../../Redux/profileSlice'
import './SearchUser.css'
import { TabPanel, TabView } from 'primereact/tabview'
import { Rating } from 'primereact/rating'
import { Panel } from 'primereact/panel'
import { BreadCrumb } from 'primereact/breadcrumb'
import { Skeleton } from 'primereact/skeleton'

const SearchUser: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch<AppDispatch>();
  const searchProfile = useSelector((state: RootState) => state.profile.searchProfile);
  const status = useSelector((state: RootState) => state.profile.searchProfileStatus);
  const error = useSelector((state: RootState) => state.profile.error);
  const items = [{ label: 'Search', url: '/client/search' }, { label: 'Profile' }];
  const home = { icon: 'pi pi-home', url: '/home' }

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchSearchProfileById(id || ''));
    }
  }, [status, dispatch]);

  const openResume = () => {
    const w = window.open(searchProfile.resumeLink, '_blank');
    if (w) {
      w.focus(); // okay now
    }
  }

  return (
    <>
      <section className="bg-light">
        <div className='row mb-1 BreadCrumb'>
          <div className='col-12'>
            <BreadCrumb model={items} home={home} />
          </div>
        </div>
      </section>
      {status === "loading" && (
        <div className="border-round border-1 surface-border p-4 surface-card">
          <div className="flex mb-3">
            <Skeleton shape="circle" size="10rem" className="mr-2"></Skeleton>
            <div>
              <Skeleton width="40rem" className="mb-2"></Skeleton>
              <Skeleton width="40rem" className="mb-2"></Skeleton>
              <Skeleton height="5rem"></Skeleton>
            </div>
          </div>
          <Skeleton width="100%" height="150px"></Skeleton>
          <div className="flex justify-content-between mt-3">
            <Skeleton width="4rem" height="2rem"></Skeleton>
            <Skeleton width="4rem" height="2rem"></Skeleton>
          </div>
        </div>
      )}
      {
        status === "succeeded" && (

          <section className="bg-light">
            <div className="container">
              <div className="row main-profile">
                <div className='col-3 p-4  card  border-0'>
                  <div className='card-body '>
                    <div className="mb-4 ">
                      <img className='profile-image' src={searchProfile.profilePic} alt="..." />
                    </div>
                    <div className='text-center'>
                      <p className="fw-normal fs-2 text-primary p-0 mb-1">{`${searchProfile.firstName} ${searchProfile.lastName}`}</p>
                      <p className="fw-light text-secondary p-0 mb-1">{searchProfile.email}</p>
                      <p className="fw-light text-secondary p-0 mb-1">       <i className={" pi pi-phone"} style={{ fontSize: '1rem' }} ></i>
                        <small>{'  '} {searchProfile.phone}</small></p>
                      <button type="button" className="btn btn-primary">Select</button>


                    </div>

                    <div className="mt-4 mb-lg-0">
                      <div className='d-flex gap-4  mb-2'>
                        <div>  Rating 1</div>
                        <div> <Rating value={searchProfile.rating1} readOnly cancel={false} /></div>

                      </div>
                      <div className='d-flex gap-4  mb-2'>
                        <div>  Rating 2</div>
                        <div> <Rating value={searchProfile.rating2} readOnly cancel={false} /></div>

                      </div>
                      <div className='d-flex gap-4  mb-2'>
                        <div>  Rating 3</div>
                        <div> <Rating value={searchProfile.rating3} readOnly cancel={false} /></div>

                      </div>
                      <div className='d-flex gap-4  mb-2'>
                        <div>  Rating 4</div>
                        <div> <Rating value={searchProfile.rating4} readOnly cancel={false} /></div>

                      </div>
                      <div className='d-flex gap-4  mb-2'>
                        <div>  Rating 5</div>
                        <div> <Rating value={searchProfile.rating5} readOnly cancel={false} /></div>

                      </div>

                    </div>

                  </div>

                </div>
                <div className='col-9 p-4 card  border-0'>
                  <div className='card-body  '>
                    <TabView>
                      <TabPanel header="About" leftIcon="pi pi-user mr-2">
                        {
                          Object.keys(searchProfile.basicDetails || {})?.map((basicDetail: string) => {
                            return (
                              <div className='mb-2'>
                                {/* <div>  {basicDetail}</div> */}
                                <div>{searchProfile.basicDetails[basicDetail]}</div>
                                <hr className="horizontal-divider" />

                              </div>
                            )
                          })
                        }

                      </TabPanel>
                      <TabPanel header="Experience" leftIcon="pi pi-graduation-cap mr-2">

                        <div className='row'>
                          <div className='col-12 text-right'>
                            <button type="button" onClick={openResume} className="btn btn-outline-primary">View resume</button>

                          </div>
                          <div className='col-12'>
                            {
                              Object.keys(searchProfile.experienceDetails || {})?.map((experienceDetail: string) => {
                                return (
                                  <Panel toggleable header={experienceDetail} className=' mb-1'>
                                    <p className="m-0">
                                      {searchProfile.experienceDetails[experienceDetail]}
                                    </p>
                                  </Panel>
                                )
                              })
                            }

                          </div>

                        </div>
                      </TabPanel>
                      <TabPanel header="Feedback" leftIcon="pi pi-comment mr-2" >
                        <div className='row'>
                          <div className='col-12'>
                            <Panel toggleable header="Short Feedback" className=' mb-1'>
                              <p className="m-0">
                                {searchProfile.feedback?.shortFeedback}
                              </p>
                            </Panel>

                            <Panel toggleable header="Long Feedback" className=' mb-1'>
                              <p className="m-0">
                                {searchProfile.feedback?.longFeedback}
                              </p>
                            </Panel>
                            <Panel toggleable header="Video Feedback" className=' mb-1'>
                              <video width="100%" controls >
                                <source src={searchProfile.videoLink} type="video/mp4" />
                              </video>
                            </Panel>
                          </div>
                        </div>
                      </TabPanel>
                    </TabView>

                    <div className='d-flex justify-content-between'>
                      <p className='fw-normal text-secondary fs-6  p-0 mb-1'>Manage By : {searchProfile.managedBy}</p>
                      <p className='fw-normal text-secondary fs-6  p-0 mb-1'>Interview By :{searchProfile.interviewBy} </p>

                    </div>
                  </div>

                </div>
              </div>
            </div>
          </section >
        )
      }
    </>
  )
}

export default SearchUser
