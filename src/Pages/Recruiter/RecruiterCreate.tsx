import React, { useEffect, useRef, useState } from 'react'

import { TabPanel, TabView } from 'primereact/tabview'
import { IProfile } from '../../Types/ProfileType'
import { Rating } from 'primereact/rating'
import { Panel } from 'primereact/panel'
import '../Interview/InterviewCreare.css'
import signInImage from './../../Images/userupload.png'
import { createProfileInterview, fetchSearchProfileById, updateProfileInterview } from '../../Redux/profileSlice'
import { AppDispatch, RootState } from '../../App/Store'
import { useDispatch, useSelector } from 'react-redux'
import { Toast } from 'primereact/toast'
import { useNavigate, useParams } from 'react-router-dom'
import { NoticePeriod, userRole } from '../../Utils/Const'
import CreatableSelect from 'react-select/creatable'
import { getUserEmail, getUserRole, uuidv4 } from '../../Utils/Utils'

const RecruiterProfileCreate: React.FC = () => {
  const items = [{ label: 'Recruiter Profile', url: '/recruiter/profile' }, { label: 'Create Profile' }];
  const home = { icon: 'pi pi-home', url: '/home' }
  const [profile, setProfile] = useState<IProfile>({ managedBy: getUserEmail() });
  const [profilePicture, setProfilePicture] = useState(null);
  const [resume, setResume] = useState(null);
  const [interviewVideo, setInterviewVideo] = useState(null);
  const createProfileStatus = useSelector((state: RootState) => state.profile.createProfileStatus);
  const searchProfile = useSelector((state: RootState) => state.profile.searchProfile);

  const toast = useRef<any>(null);
  let navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (id) {
        setIsEditMode(true);
        try {
          const profileData = await dispatch(fetchSearchProfileById(id || ''));
          await setProfile(profileData.payload as IProfile);
        } catch (error) {
          console.error('Error fetching profile data:', error);
        }
      }
    };
    fetchProfileData();
  }, [id, dispatch]);

  // Handle file selection
  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (type === 'profilePicture') {
      setProfilePicture(file);
      setProfile({ ...profile, profilePic: URL.createObjectURL(file) as any });
    } else if (type === 'resume') {
      setResume(file);
      setProfile({ ...profile, resumeLink: URL.createObjectURL(file) as any });
    } else if (type === 'interviewVideo') {
      setInterviewVideo(file);
      setProfile({ ...profile, videoLink: URL.createObjectURL(file) as any });
    }
  };

  const createProfile = async (e) => {
    e.preventDefault()
    const form = new FormData();
    if (profilePicture) form.append('profilePicture', profilePicture);
    if (resume) form.append('resume', resume);
    if (interviewVideo) form.append('interviewVideo', interviewVideo);
    form.append('data', JSON.stringify(profile));
    if (profile.programmingR && profile.dataEngR && profile.cloudEngR && profile.communicationR && profile.attitudeR) {
      if (isEditMode) {
        await dispatch(updateProfileInterview(form))
      }
      else {

        await dispatch(createProfileInterview(form))
      }
    }
  }

  useEffect(() => {
    if (createProfileStatus === "succeeded") {
      toast.current.show({ severity: 'info', summary: 'Created', detail: 'Profile created succeefully', life: 3000 });
      const role = getUserRole();
      if (role === userRole.admin) {
        navigate('/admin/profile');
      }
      else if (role === userRole.recruiter) {
        navigate('/recruiter/profile');
      }
    }
  }, [createProfileStatus])

  const certificationUpdate = (event: any) => {
    const certificationList = event.map(x => x.value);
    setProfile((prevState) => ({
      ...prevState, // copy the previous state
      certificationList: [...certificationList] // create a new array with added or modified values
    }));
  }

  const skillsUpdate = (event: any) => {
    if (profile.summary) {
      const skills = event.map(x => x.value);
      setProfile((prevState) => ({
        ...prevState, // copy the previous state
        summary: {
          skills: [...skills]
        } // create a new array with added or modified values
      }));
    }
    else {
      profile.summary = {};
    }
  }

  return (
    <>
      <Toast ref={toast} />
      <section>
        <div className="container">
          <form onSubmit={createProfile}>
            <div className="row">
              <div className='col-3 p-4   border-0'>
                <div className='card-body '>
                  <div className="mb-4 ">
                    <div className="imgUp">
                      <div className="imagePreview align-middle">
                        {!profile?.profilePic && <img className='profile-image' src={signInImage} />}
                        {profile?.profilePic && <img className='profile-image' src={profile?.profilePic || ''} />}
                      </div>
                      <label className="btn btn-primary">
                        Upload<input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'profilePicture')}
                          className="uploadFile img" style={{ width: "0px", height: "0px", overflow: "hidden" }} />
                      </label>
                    </div>
                  </div>
                  <div className="mt-4 mb-lg-0">
                    {
                      (profile.lastName && (!profile.programmingR || !profile.dataEngR || !profile.cloudEngR || !profile.communicationR || !profile.attitudeR)) &&
                      (
                        <p className="text-danger">Select Rating</p>
                      )
                    }
                    <div className='d-flex justify-content-between  mb-2'>
                      <div>Programming <span className="text-danger">*</span></div>
                      <div> <Rating value={profile.programmingR} onChange={(e) => setProfile({ ...profile, programmingR: e.value || 0 })} cancel={false} /></div>
                    </div>
                    <div className='d-flex justify-content-between  mb-2'>
                      <div> Data Engineer <span className="text-danger">*</span></div>
                      <div> <Rating value={profile.dataEngR} onChange={(e) => setProfile({ ...profile, dataEngR: e.value || 0 })} cancel={false} /></div>
                    </div>
                    <div className='d-flex justify-content-between  mb-2'>
                      <div> Cloud <span className="text-danger">*</span></div>
                      <div> <Rating value={profile.cloudEngR} onChange={(e) => setProfile({ ...profile, cloudEngR: e.value || 0 })} cancel={false} /></div>
                    </div>
                    <div className='d-flex justify-content-between  mb-2'>
                      <div> Communication <span className="text-danger">*</span></div>
                      <div> <Rating value={profile.communicationR} onChange={(e) => setProfile({ ...profile, communicationR: e.value || 0 })} cancel={false} /></div>
                    </div>
                    <div className='d-flex justify-content-between  mb-2'>
                      <div>  Attitude <span className="text-danger">*</span></div>
                      <div> <Rating value={profile.attitudeR} onChange={(e) => setProfile({ ...profile, attitudeR: e.value || 0 })} cancel={false} /></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-9 p-4 card  border-0'>
                <div className='card-body'>
                  <div className='text-right mb-1'>
                    <button className="btn bsb-btn-xl btn-primary" type="submit">Save</button>
                  </div>
                  <Panel toggleable header="Personal Details" className='mb-1'>
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
                        <label className="form-label">Gender <span className="text-danger">*</span></label>
                        <input value={profile.gender} type="text" className="form-control" onChange={(e) => setProfile({ ...profile, gender: e.target.value })} required />
                      </div>
                      <div className="col-6 from-row">
                        <label className="form-label">Location <span className="text-danger">*</span></label>
                        <input value={profile.location} type="text" className="form-control" onChange={(e) => setProfile({ ...profile, location: e.target.value })} required />
                      </div>

                    </div>
                    <div className='row gy-3 gy-md-4 my-2'>
                      <div className="col-6 from-row">
                        <label className="form-label">Email <span className="text-danger">*</span></label>
                        <input value={profile.email} type="email" className="form-control" onChange={(e) => setProfile({ ...profile, email: e.target.value })} required />
                      </div>
                      <div className="col-6 from-row">
                        <label className="form-label">Phone No <span className="text-danger">*</span></label>
                        <input value={profile.phone} type="text" className="form-control" onChange={(e) => setProfile({ ...profile, phone: e.target.value })} required />
                      </div>
                    </div>
                    <div className='row gy-3 gy-md-4 my-2'>
                      <div className="col-6 from-row">
                        <label className="form-label">Current Company <span className="text-danger">*</span></label>
                        <input value={profile.currentCompany} type="text" className="form-control" onChange={(e) => setProfile({ ...profile, currentCompany: e.target.value })} required />
                      </div>
                      <div className="col-6 from-row">
                        <label className="form-label">Designation <span className="text-danger">*</span></label>
                        <input value={profile.designation} type="text" className="form-control" onChange={(e) => setProfile({ ...profile, designation: e.target.value })} required />
                      </div>
                    </div>

                    <div className='row gy-3 gy-md-4 my-2'>
                      <div className="col-6 from-row">
                        <label className="form-label">Total Experience (Years)<span className="text-danger">*</span></label>
                        <input value={profile.overallExp} type="number" className="form-control" onChange={(e) => setProfile({ ...profile, overallExp: Number(e.target.value) })} required />
                      </div>
                      <div className="col-6 from-row">
                        <label className="form-label">Current CTC (LPA) <span className="text-danger">*</span></label>
                        <input value={profile.currentCTC} type="text" className="form-control" onChange={(e) => setProfile({ ...profile, currentCTC: Number(e.target.value) })} required />
                      </div>
                    </div>

                    <div className='row gy-3 gy-md-4 my-2'>
                      <div className="col-6 from-row">
                        <label className="form-label">Relevant Experience (Years)<span className="text-danger">*</span></label>
                        <input value={profile.relevantExp} type="number" className="form-control" onChange={(e) => setProfile({ ...profile, relevantExp: Number(e.target.value) })} required />
                      </div>
                      <div className="col-6 from-row">
                        <label className="form-label">Expected CTC (LPA) <span className="text-danger">*</span></label>
                        <input value={profile.expectedCTC} type="text" className="form-control" onChange={(e) => setProfile({ ...profile, expectedCTC: Number(e.target.value) })} required />
                      </div>
                    </div>

                    <div className='row gy-3 gy-md-4 my-2'>
                      <div className="col-6 from-row">
                        <label className="form-label">Notice Period <span className="text-danger">*</span></label>
                        <select value={profile.noticePeriod} onChange={(e) => setProfile({ ...profile, noticePeriod: e.target.value })} className="form-control" aria-label="Default select example">
                          {
                            NoticePeriod.map(x => {
                              return (
                                <option key={`test-${uuidv4()}`} value={x.value}>{x.name}</option>
                              )
                            })
                          }
                        </select>
                      </div>
                      <div className="col-6 from-row">
                        <label className="form-label">Category <span className="text-danger">*</span></label>
                        <select value={profile.jobCategory} onChange={(e) => setProfile({ ...profile, jobCategory: e.target.value })} className="form-control" aria-label="Default select example">
                          <option value={'fulltime'}>Full-Time</option>
                          <option value={'parttime'}>Part-Time</option>
                          <option value={'c2h'}>Contract/C2H</option>
                          <option value={'premium'}>Premium</option>
                          <option value={'executive'}>Executive</option>
                        </select>
                      </div>
                    </div>

                    {/* <div className='row gy-3 gy-md-4 my-2'>
                      <div className="col-6 from-row">
                        <label className="form-label">Recruiter <span className="text-danger">*</span></label>
                        <input value={profile.managedBy} readOnly type="text" className="form-control" onChange={(e) => setProfile({ ...profile, managedBy: e.target.value })} required />
                      </div>
                      <div className="col-6 from-row">
                        <label className="form-label">Interviewer  <span className="text-danger">*</span></label>
                        <input value={profile.interviewBy} type="text" className="form-control" onChange={(e) => setProfile({ ...profile, interviewBy: e.target.value })} required />
                      </div>
                    </div> */}
                    <div className='row gy-3 gy-md-4 my-2'>
                      <div className="col-6 from-row">
                        <label className="form-label">Match % <span className="text-danger">*</span></label>
                        <input value={profile.matchPer} type="text" className="form-control" onChange={(e) => setProfile({ ...profile, matchPer: e.target.value })} required />
                      </div>


                    </div>

                    <div className='row gy-3 gy-md-4 my-2'>
                      <div className="col-12 from-row">
                        <label className="form-label">Certifications  <span className="text-danger">*</span></label>
                        <CreatableSelect value={profile.certificationList?.map((x => { return { value: x, label: x } }))} onChange={certificationUpdate} isMulti required />
                      </div>
                    </div>

                    <div className='row gy-3 gy-md-4 my-2'>
                      <div className="col-12 from-row">
                        <label className="form-label">Skills </label>
                        <CreatableSelect onChange={skillsUpdate} value={profile.summary?.skills?.map((x => { return { value: x, label: x } }))} isMulti  />
                      </div>
                    </div>
                  </Panel>
                  <Panel toggleable header="Summary Details" className='mb-1'>

                    <div className="form-group">
                      <label className="form-label">Summary #1 <span className="text-danger">*</span></label>
                      <textarea className="form-control" value={profile.summary?.summary1} onChange={(e) => setProfile({ ...profile, summary: { ...profile.summary, "summary1": e.target.value } })} rows={3} required></textarea>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Summary #2 <span className="text-danger">*</span></label>
                      <textarea className="form-control" value={profile.summary?.summary2} onChange={(e) => setProfile({ ...profile, summary: { ...profile.summary, "summary2": e.target.value } })} rows={3} required></textarea>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Summary #3 </label>
                      <textarea className="form-control" value={profile.summary?.summary3} onChange={(e) => setProfile({ ...profile, summary: { ...profile.summary, "summary3": e.target.value } })} rows={3}></textarea>
                    </div>
                  </Panel>
                  <Panel toggleable header="Experience Details" className='mb-1'>

                    <div className="form-group">
                      <label className="form-label">Experience #1 <span className="text-danger">*</span></label>
                      <textarea className="form-control" value={profile.experienceDetails?.expD1} onChange={(e) => setProfile({ ...profile, experienceDetails: { ...profile.experienceDetails, "expD1": e.target.value } })} rows={3} required></textarea>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Experience #2 </label>
                      <textarea className="form-control" value={profile.experienceDetails?.expD2} onChange={(e) => setProfile({ ...profile, experienceDetails: { ...profile.experienceDetails, "expD2": e.target.value } })} rows={3}></textarea>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Experience #3 </label>
                      <textarea className="form-control" value={profile.experienceDetails?.expD3} onChange={(e) => setProfile({ ...profile, experienceDetails: { ...profile.experienceDetails, "expD3": e.target.value } })} rows={3}></textarea>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Experience #4 </label>
                      <textarea className="form-control" value={profile.experienceDetails?.expD4} onChange={(e) => setProfile({ ...profile, experienceDetails: { ...profile.experienceDetails, "expD4": e.target.value } })} rows={3}></textarea>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Resume Link </label>
                      <input type="file" accept="application/pdf" className="form-control" onChange={(e) => handleFileChange(e, 'resume')} />
                      {profile?.resumeLink && (
                        <div>
                          <a href={profile?.resumeLink} target="_blank" rel="noopener noreferrer">Download Resume</a>
                        </div>
                      )}
                    </div>
                  </Panel>
                  <Panel toggleable header="Feedback Details" className='mb-1'>
                    <div className="form-group">
                      <label className="form-label">Feedback <span className="text-danger">*</span></label>
                      <textarea className="form-control" value={profile.feedback?.shortFeedback} onChange={(e) => setProfile({ ...profile, feedback: { ...profile.feedback, shortFeedback: e.target.value } })} rows={3} required></textarea>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Video feedback URL</label>
                      <input type="file" className="form-control" onChange={(e) => handleFileChange(e, 'interviewVideo')} />
                      {profile?.videoLink && (
                        <div>
                          <a href={profile?.videoLink} target="_blank" rel="noopener noreferrer">Download Feedback Video</a>
                        </div>
                      )}
                    </div>

                  </Panel>
                  <div className='text-right'>
                    <button className="btn bsb-btn-xl btn-primary" type="submit">Save</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section >
    </>
  )
}

export default RecruiterProfileCreate