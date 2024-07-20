import React, { useEffect } from 'react'
import { MdInfo, MdWork, MdFeedback } from 'react-icons/md'
import { FaStar } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import { users } from '../../data/users'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../App/Store'
import { fetchSearchProfileById } from '../../Redux/profileSlice'
import './SearchUser.css'
import { TabPanel, TabView } from 'primereact/tabview'
import { Rating } from 'primereact/rating'
import { Divider } from 'primereact/divider'
const SearchUser: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch<AppDispatch>();
  const searchProfile = useSelector((state: RootState) => state.profile.searchProfile);
  const status = useSelector((state: RootState) => state.user.status);
  const error = useSelector((state: RootState) => state.user.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchSearchProfileById(id || ''));
    }
  }, [status, dispatch]);

  return (
    <>
      <section className="bg-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 mb-4 mb-sm-5">
              <div className="card card-style1 border-0">
                <div className="card-body p-1-9 p-sm-2-3 p-md-6 p-lg-7">
                  <div className="row ">
                    <div className="col-lg-4 mb-4 mb-lg-0">
                      <img src={searchProfile.profilePic} alt="..." />
                    </div>
                    <div className="col-lg-8 px-xl-10">
                      <div className='row'>
                        <div className='col-8'>
                          <div className="bg-secondary d-lg-inline-block py-1-9 px-1-9 px-sm-6 mb-1-9 rounded">
                            <h3 className="h2 text-white mb-0">{`${searchProfile.firstName} ${searchProfile.lastName}`}</h3>
                          </div>
                          <ul className="list-unstyled mb-1-9">
                            <li className="mb-2 mb-xl-3 display-28"><span className="display-26 text-secondary me-2 font-weight-600">Email:</span> {searchProfile.email}</li>
                            <li className="mb-2 mb-xl-3 display-28"><span className="display-26 text-secondary me-2 font-weight-600">Interview By:</span> {searchProfile.interviewBy}</li>
                            <li className="mb-2 mb-xl-3 display-28"><span className="display-26 text-secondary me-2 font-weight-600">Managed By:</span> {searchProfile.managedBy}</li>
                            <li className="mb-2 mb-xl-3 display-28"><span className="display-26 text-secondary me-2 font-weight-600">Phone:</span> {searchProfile.phone}</li>
                          </ul>
                        </div>
                        {/* <div className='col-4'>
                          <div className='flex gap-2 align-middle'>
                            <i className='pi pi-map-marker'></i>
                            <i>{searchProfile.location}</i>
                          </div>
                          <button type="button" className="btn btn-success"> Select</button>
                        </div> */}
                      </div>


                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12 mb-4 mb-sm-5">
                      <div className="card card-style1 border-0">
                        <div className="card-body">
                          <div className="row ">
                            <div className="col-lg-4 col-md-4 mt-4 mb-lg-0">
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
                            <div className="col-lg-8 col-md-8 px-xl-10">
                              <TabView>
                                <TabPanel header="About" leftIcon="pi pi-user mr-2">
                                  {
                                    Object.keys(searchProfile.basicDetails || {})?.map((basicDetail: string) => {
                                      return (
                                        <div className='d-flex gap-4  mb-2'>
                                          <div>  {basicDetail}</div>
                                          <div>{searchProfile.basicDetails[basicDetail]}</div>
                                        </div>
                                      )
                                    })
                                  }

                                </TabPanel>
                                <TabPanel header="Experience" leftIcon="pi pi-graduation-cap mr-2">

                                  <div className='row'>
                                    <div className='col-12'>
                                      {
                                        Object.keys(searchProfile.experienceDetails || {})?.map((experienceDetail: string) => {
                                          return (
                                            <div className='d-flex gap-4  mb-2'>
                                              <div>  {experienceDetail}</div>
                                              <div>{searchProfile.experienceDetails[experienceDetail]}</div>
                                            </div>
                                          )
                                        })

                                      }
                                    </div>
                                    <div className='col-12'>
                                      <iframe src={searchProfile.resumeLink} width="100%" height="500px" />                                    </div>
                                  </div>
                                </TabPanel>
                                <TabPanel header="Feedback" leftIcon="pi pi-comment mr-2" >
                                  <div className='row'>
                                    <div className='col-4'>
                                      <p className="m-0">
                                        {searchProfile.feedback?.shortFeedback}
                                      </p>
                                      <Divider />
                                      <p className="m-0">
                                        {searchProfile.feedback?.longFeedback}
                                      </p>
                                    </div>
                                    <div className='col-8'>
                                      <video width="100%" controls >
                                        <source src={searchProfile.videoLink} type="video/mp4" />
                                      </video>
                                    </div>
                                  </div>
                                </TabPanel>
                              </TabView>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>
    </>

  )
}

export default SearchUser
