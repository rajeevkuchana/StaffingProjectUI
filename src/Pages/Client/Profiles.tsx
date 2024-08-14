import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../App/Store'
import { fetchJobCategory, fetchSearchProfile, reset } from '../../Redux/profileSlice'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import './Search.css'
import { Rating } from 'primereact/rating'
import { BreadCrumb } from 'primereact/breadcrumb'
import Loader from '../../Components/Loader'
import { IconField } from 'primereact/iconfield'
import { InputText } from 'primereact/inputtext'
import { InputIcon } from 'primereact/inputicon'
import FilterSidebar from '../../Components/FilterSidebar'
import { getJobType, getUserEmail } from '../../Utils/Utils'
import { Editor } from 'primereact/editor';
import { data } from './JobData'
import JobDescription from '../../Components/JobDescription'
import CreatableSelect from 'react-select/creatable';
import { Experience, NoticePeriod } from '../../Utils/Const'

const Profiles: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { jobCategory } = useParams<{ jobCategory: string }>();
  const { id } = useParams<{ id: string }>();

  const [jobProfile, setJobProfile] = useState([{value: id, label: id }]);
  const [experience, setExperience] = useState('');
  const [noticePeriod, setNoticePeriod] = useState('');
  const [budget, setBudget] = useState(Number);
  const location = useLocation();
  const [globalFilter, setGlobalFilter] = useState(null);
  const searchProfiles = useSelector((state: RootState) => state.profile.searchProfiles);
  const searchProfilesJobDesc = useSelector((state: RootState) => state.profile.searchProfilesJobDesc);
  const status = useSelector((state: RootState) => state.profile.searchProfilesStatus);
  const error = useSelector((state: RootState) => state.profile.error);
  let navigate = useNavigate();

  useEffect(() => {
    if (status === 'idle') {
      updateProfileData()
    }
  }, [status, dispatch]);


  useEffect(() => {
    updateProfileData();
  }, [experience, noticePeriod, budget, jobProfile]);

  useEffect(() => {
    return () => {
      dispatch(reset())
    };
  }, []);

  const updateProfileData = () => {
    dispatch(fetchSearchProfile(
      {
        "jobCategory": jobCategory,
        "jobProfile": jobProfile.map(x=>x.value),
        experienceRange: experience,
        noticePeriod: noticePeriod,
        budget: budget,
        "email": getUserEmail()
      }
    ));
  }

  const updateProfile = (event: any) => {
    setJobProfile(event);
  }

  const profileBodyTemplate = (rowData) => {
    return (
      <div className="align-items-center">
        <img src={rowData.profilePic} width="40" style={{ borderRadius: "20px" }} />
      </div>
    );
  };

  const nameBodyTemplate = (rowData) => {
    return (
      <div className="align-items-center">
        <p className=" m-0 "><small>
          {rowData.firstName}  {rowData.lastName}

        </small>
        </p>
        <small className="text-body-secondary">{rowData.email}</small>
        {/* <p className='text-body-secondary  m-0'>        <i className={" pi pi-phone"} ></i>
          <small className="text-body-secondary ">{rowData.phone}</small></p> */}

      </div>
    );
  };

  const interviewBodyTemplate = (rowData) => {
    return (
      <div className="align-items-center">
        <p className="m-0 ">
          <i className={" pi pi-user"}>  </i> <small>{rowData.interviewBy}</small>
        </p>
        {/* <small className="text-body-secondary m-0">{`${new Date(rowData.interviewDateTime).toLocaleDateString()} ${new Date(rowData.interviewDateTime).toLocaleTimeString()}`}</small> */}
      </div>
    );
  };


  const manageByBodyTemplate = (rowData) => {
    return (
      <div className="align-items-center">
        <p className="m-0">
          <i className={" pi pi-user"}>  </i><small> {rowData.managedBy}</small>
        </p>
      </div>
    );
  };

  const locationBodyTemplate = (rowData) => {
    return (
      <div className="align-items-center">
        <p className=" m-0 ">
          <i className={" pi pi-map-marker"}>  </i>  <small>{rowData.location}</small>
        </p>
      </div>
    );
  };

  const currentCompanyBodyTemplate = (rowData) => {
    return (
      <div className="align-items-center">
        <p className=" m-0 ">
          <small>{rowData.currentCompany}</small>
        </p>
      </div>
    );
  };

  const designationBodyTemplate = (rowData) => {
    return (
      <div className="align-items-center">
        <p className=" m-0 ">
          <small>{rowData.designation}</small>
        </p>
      </div>
    );
  };

  const currentCTCBodyTemplate = (rowData) => {
    return (
      <div className="align-items-center">
        <p className=" m-0 ">
          <small>{rowData.currentCTC}</small>
        </p>
      </div>
    );
  };

  const expectedCTCBodyTemplate = (rowData) => {
    return (
      <div className="align-items-center">
        <p className=" m-0 ">
          <small>{rowData.expectedCTC}</small>
        </p>
      </div>
    );
  };

  const overallExperienceBodyTemplate = (rowData) => {
    return (
      <div className="align-items-center">
        <p className=" m-0 ">
          <small>{rowData.overallExp}</small>
        </p>
      </div>
    );
  };

  const relevantExperienceBodyTemplate = (rowData) => {
    return (
      <div className="align-items-center">
        <p className=" m-0 ">
          <small>{rowData.relevantExp}</small>
        </p>
      </div>
    );
  };

  const ratingBodyTemplate = (rowData) => {
    return <Rating value={rowData.overAllRating} readOnly cancel={false} />;
  };

  const onRowSelect = (event) => {
    navigate(`/client/profile-detail/${jobCategory}/${event.data.profileId}`);
  };

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <div>
        Users
      </div>
      <IconField iconPosition="left">
        <InputIcon className="pi pi-search" />
        <InputText type="search" onInput={(e: any) => setGlobalFilter(e.target.value)} placeholder="Search..." />
      </IconField>
    </div>
  );

  return (
    <>
      <section className="bg-light">
        <div className='row m-1 border rounded'>
          <div className='col-6'>
            <label className="form-label">Enter profile </label>
            <CreatableSelect defaultValue={jobProfile} onChange={updateProfile} isMulti />
          </div>
          <div className='col-2'>
            <label className="form-label">Experience </label>
            <select value={experience} onChange={e => { setExperience(e.target.value) }} className="form-control" aria-label="Default select example">
              {
                Experience.map(x => {
                  return (
                    <option value={x.value}>{x.name}</option>
                  )
                })
              }
            </select>
          </div>
          <div className='col-2'>
            <label className="form-label">Notice Period </label>
            <select value={noticePeriod} onChange={e => { setNoticePeriod(e.target.value) }} className="form-control" aria-label="Default select example">
              {
                NoticePeriod.map(x => {
                  return (
                    <option value={x.value}>{x.name}</option>
                  )
                })
              }
            </select>
          </div>
          <div className='col-2'>
            <label className="form-label">Budget (LPA)</label>
            <input value={budget} onChange={e => { setBudget(Number(e.target.value)) }} className="form-control" type='number' required />
          </div>
        </div>
      </section>
      <div className="">
        <div className='row' style={{ height: "78vh" }}>
          <div className='col-12  h-100'>
            <div className='card overflow-auto h-100 profile-table'>
              {status === "succeeded" &&
                <>
                  {getJobType() !== "profiles" && (
                    <JobDescription data={searchProfilesJobDesc}></JobDescription>
                  )}
                  {getJobType() === "profiles" && (
                    <DataTable scrollable scrollHeight="flex" onRowSelect={onRowSelect} globalFilter={globalFilter} selectionMode="single" paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]} value={searchProfiles} tableStyle={{ minWidth: '50rem' }}>
                      {/* <Column className='profile' field="profilePic" body={profileBodyTemplate} header=""></Column> */}
                      <Column frozen className="text-nowrap" headerClassName='column-title' field="firstName" body={nameBodyTemplate} header="Name"></Column>
                      <Column className="text-nowrap" headerClassName='column-title' field="location" body={locationBodyTemplate} header="Location"></Column>
                      <Column className="text-nowrap" headerClassName='column-title' field="currentCompany" body={currentCompanyBodyTemplate} header="Current Company"></Column>
                      <Column className="text-nowrap" headerClassName='column-title' field="designation" body={designationBodyTemplate} header="Designation"></Column>
                      <Column className="text-nowrap" headerClassName='column-title' field="currentCTC" body={currentCTCBodyTemplate} header="Current CTC"></Column>
                      <Column className="text-nowrap" headerClassName='column-title' field="expectedCTC" body={expectedCTCBodyTemplate} header="Expected CTC"></Column>
                      <Column className="text-nowrap" headerClassName='column-title' field="OverallExp" body={overallExperienceBodyTemplate} header="Overall Experience"></Column>
                      <Column className="text-nowrap" headerClassName='column-title' field="relevantExp" body={relevantExperienceBodyTemplate} header="Relevant Experience"></Column>

                      {/* <Column  className="text-nowrap" headerClassName='text-nowrap column-title' field="interviewBy" body={interviewBodyTemplate} header="Interviewer"></Column>
                      <Column  className="text-nowrap" headerClassName='text-nowrap column-title' field="managedBy" body={manageByBodyTemplate} header="Manage by"></Column> */}
                      <Column className="text-nowrap" headerClassName='text-nowrap column-title' field="overAllRating" body={ratingBodyTemplate} header="Rating"></Column>
                    </DataTable>
                  )}
                </>
              }
            </div>
          </div>
        </div>
        {status === "loading" && <Loader></Loader>}
      </div></>
  )
}

export default Profiles
