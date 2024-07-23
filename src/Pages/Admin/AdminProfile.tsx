import React, { useEffect, useState } from 'react'
import { MdInfo, MdWork, MdFeedback } from 'react-icons/md'
import { FaStar } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import { users } from '../../data/users'
import { BreadCrumb } from 'primereact/breadcrumb'
import { TabPanel, TabView } from 'primereact/tabview'
import { IProfile } from '../../Types/ProfileType'
import { Rating } from 'primereact/rating'
import { Panel } from 'primereact/panel'
import '../Interview/InterviewCreare.css'
import { Skeleton } from 'primereact/skeleton'
import signInImage from './../../Images/userupload.png'
import { createProfileInterview } from '../../Redux/profileSlice'
import { AppDispatch } from '../../App/Store'
import { useDispatch } from 'react-redux'

const AdminProfileCreate: React.FC = () => {
  const items = [{ label: 'Profile', url: '/admin/profile' }, { label: 'Create Profile' }];
  const home = { icon: 'pi pi-home', url: '/home' }
  const [profile, setProfile] = useState<IProfile>({ basicDetails: {} });
  const [selectedFile, setSelectedFile] = useState()
  const [preview, setPreview] = useState()
  const dispatch = useDispatch<AppDispatch>();

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined)
      return
    }

    const objectUrl = URL.createObjectURL(selectedFile) as any
    setPreview(objectUrl)

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  const onSelectFile = e => {
    
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined)
      return
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0])
  }

  const createProfile = ()=>{
    dispatch(createProfileInterview(profile))
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
      <section className="bg-light">
        <div className="container">
          <div className="row main-profile">
            <div className='col-3 p-4  card  border-0'>
              <div className='card-body '>
                <div className="mb-4 ">
                  <div className="imgUp">
                    <div className="imagePreview align-middle">
                      {preview && <img className='profile-image' src={preview} />}
                      {!preview && <img className='profile-image' src={signInImage} />}
                    </div>
                    <label className="btn btn-primary">
                      Upload<input type="file" onChange={onSelectFile} className="uploadFile img" style={{ width: "0px", height: "0px", overflow: "hidden" }} />
                    </label>
                  </div>
                </div>
                <div className="mt-4 mb-lg-0">
                  <div className='d-flex gap-4  mb-2'>
                    <div>  Rating 1</div>
                    <div> <Rating value={profile.rating1} onChange={(e) => setProfile({ ...profile, rating1: e.value || 0 })} cancel={false} /></div>

                  </div>
                  <div className='d-flex gap-4  mb-2'>
                    <div>  Rating 2</div>
                    <div> <Rating value={profile.rating2} onChange={(e) => setProfile({ ...profile, rating2: e.value || 0 })} cancel={false} /></div>

                  </div>
                  <div className='d-flex gap-4  mb-2'>
                    <div>  Rating 3</div>
                    <div> <Rating value={profile.rating3} onChange={(e) => setProfile({ ...profile, rating3: e.value || 0 })} cancel={false} /></div>

                  </div>
                  <div className='d-flex gap-4  mb-2'>
                    <div>  Rating 4</div>
                    <div> <Rating value={profile.rating4} onChange={(e) => setProfile({ ...profile, rating4: e.value || 0 })} cancel={false} /></div>

                  </div>
                  <div className='d-flex gap-4  mb-2'>
                    <div>  Rating 5</div>
                    <div> <Rating value={profile.rating5} onChange={(e) => setProfile({ ...profile, rating5: e.value || 0 })} cancel={false} /></div>
                  </div>

                </div>

              </div>

            </div>
            <div className='col-9 p-4 card  border-0'>
              <div className='card-body text-right '>
              <button onClick={createProfile}  className="btn bsb-btn-xl btn-primary" type="submit">Save Profile</button>

                <TabView>
                  <TabPanel header="About" leftIcon="pi pi-user mr-2">
                    <Panel toggleable header="Personal Details" className=' mb-1'>
                      <div className='row gy-3 gy-md-4 my-2'>
                        <div className="col-6 from-row">
                          <label className="form-label">First Name <span className="text-danger">*</span></label>
                          <input value={profile.firstName} type="text" className="form-control" onChange={(e) => setProfile({ ...profile, firstName: e.target.value })} required />
                        </div>
                        <div className="col-6 from-row">
                          <label className="form-label">Last Name <span className="text-danger">*</span></label>
                          <input value={profile.lastName} type="text" className="form-control" onChange={(e) => setProfile({ ...profile, lastName: e.target.value })} required />
                        </div>
                      </div>
                      <div className='row gy-3 gy-md-4 my-2'>
                        <div className="col-6 from-row">
                          <label className="form-label">Email <span className="text-danger">*</span></label>
                          <input value={profile.email} type="email" className="form-control" onChange={(e) => setProfile({ ...profile, email: e.target.value })} required />
                        </div>
                        <div className="col-6 from-row">
                          <label className="form-label">Phone No<span className="text-danger">*</span></label>
                          <input value={profile.phone} type="email" className="form-control" onChange={(e) => setProfile({ ...profile, phone: e.target.value })} required />
                        </div>
                      </div>
                      <div className='row gy-3 gy-md-4 my-2'>
                        <div className="col-6 from-row">
                          <label className="form-label">Location <span className="text-danger">*</span></label>
                          <input value={profile.location} type="text" className="form-control" onChange={(e) => setProfile({ ...profile, location: e.target.value })} required />
                        </div>
                        <div className="col-6 from-row">
                          <label className="form-label">Selected By <span className="text-danger">*</span></label>
                          <input value={profile.selectedBy} type="text" className="form-control" onChange={(e) => setProfile({ ...profile, selectedBy: e.target.value })} required />
                        </div>
                      </div>
                      <div className='row gy-3 gy-md-4 my-2'>
                        <div className="col-6 from-row">
                          <label className="form-label">Manage By <span className="text-danger">*</span></label>
                          <input value={profile.managedBy} type="text" className="form-control" onChange={(e) => setProfile({ ...profile, managedBy: e.target.value })} required />
                        </div>
                        <div className="col-6 from-row">
                          <label className="form-label">Interview By <span className="text-danger">*</span></label>
                          <input value={profile.interviewBy} type="text" className="form-control" onChange={(e) => setProfile({ ...profile, interviewBy: e.target.value })} required />
                        </div>
                      </div>
                    </Panel>

                    <Panel toggleable header="Basic Details 1" className=' mb-1'>
                      <div className="form-group">
                        <textarea className="form-control" onChange={(e) => setProfile({ ...profile, basicDetails: { ...profile.basicDetails, "basicD1": e.target.value } })} rows={3}></textarea>
                      </div>
                    </Panel>
                    <Panel toggleable header="Basic Details 2" className=' mb-1'>
                      <div className="form-group">
                        <textarea className="form-control" onChange={(e) => setProfile({ ...profile, basicDetails: { ...profile.basicDetails, "basicD2": e.target.value } })} rows={3}></textarea>
                      </div>
                    </Panel>
                    <Panel toggleable header="Basic Details 3" className=' mb-1'>
                      <div className="form-group">
                        <textarea className="form-control" onChange={(e) => setProfile({ ...profile, basicDetails: { ...profile.basicDetails, "basicD3": e.target.value } })} rows={3}></textarea>
                      </div>
                    </Panel>
                    <Panel toggleable header="Basic Details 4" className=' mb-1'>
                      <div className="form-group">
                        <textarea className="form-control" onChange={(e) => setProfile({ ...profile, basicDetails: { ...profile.basicDetails, "basicD4": e.target.value } })} rows={3}></textarea>
                      </div>
                    </Panel>
                  </TabPanel>
                  <TabPanel header="Experience" leftIcon="pi pi-graduation-cap mr-2">
                    <Panel toggleable header="Experience Details 1" className=' mb-1'>
                      <div className="form-group">
                        <textarea className="form-control" onChange={(e) => setProfile({ ...profile, experienceDetails: { ...profile.experienceDetails, "Experience Details 1": e.target.value } })} rows={3}></textarea>
                      </div>
                    </Panel>
                    <Panel toggleable header="Experience Details 2" className=' mb-1'>
                      <div className="form-group">
                        <textarea className="form-control" onChange={(e) => setProfile({ ...profile, experienceDetails: { ...profile.experienceDetails, "Experience Details 2": e.target.value } })} rows={3}></textarea>
                      </div>
                    </Panel>
                    <Panel toggleable header="Experience Details 3" className=' mb-1'>
                      <div className="form-group">
                        <textarea className="form-control" onChange={(e) => setProfile({ ...profile, experienceDetails: { ...profile.experienceDetails, "Experience Details 3": e.target.value } })} rows={3}></textarea>
                      </div>
                    </Panel>
                    <Panel toggleable header="Experience Details 4" className=' mb-1'>
                      <div className="form-group">
                        <textarea className="form-control" onChange={(e) => setProfile({ ...profile, experienceDetails: { ...profile.experienceDetails, "Experience Details 4": e.target.value } })} rows={3}></textarea>
                      </div>
                    </Panel>
                  </TabPanel>
                  <TabPanel header="Feedback" leftIcon="pi pi-comment mr-2" >
                    <div className='row'>
                      <div className='col-12'>
                        <Panel toggleable header="Short Feedback" className=' mb-1'>
                          <div className="form-group">
                            <textarea className="form-control" onChange={(e) => setProfile({ ...profile, feedback: { ...profile.feedback, shortFeedback: e.target.value } })} rows={3}></textarea>
                          </div>
                        </Panel>
                        <Panel toggleable header="Long Feedback" className=' mb-1'>
                          <div className="form-group">
                            <textarea className="form-control" onChange={(e) => setProfile({ ...profile, feedback: { ...profile.feedback, longFeedback: e.target.value } })} rows={3}></textarea>
                          </div>
                        </Panel>
                        <Panel toggleable header="Video Feedback" className=' mb-1'>
                          <div className='row gy-3 gy-md-4'>
                            <div className="col-12 from-row">
                              <label className="form-label">Video feedback URL <span className="text-danger">*</span></label>
                              <input value={profile.managedBy} type="email" className="form-control" onChange={(e) => setProfile({ ...profile, videoLink: e.target.value })} required />
                            </div>
                          </div>
                        </Panel>
                      </div>
                    </div>
                  </TabPanel>
                </TabView>


              </div>
            </div>
          </div>
        </div>
      </section >
    </>
  )
}

export default AdminProfileCreate