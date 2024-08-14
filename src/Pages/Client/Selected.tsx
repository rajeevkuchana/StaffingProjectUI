import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../App/Store'
import { fetchSelectedProfile, reset } from '../../Redux/profileSlice'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import './Search.css'
import { Rating } from 'primereact/rating'
import Loader from '../../Components/Loader'
import { IconField } from 'primereact/iconfield'
import { InputText } from 'primereact/inputtext'
import { InputIcon } from 'primereact/inputicon'


const Selected: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { jobCategory } = useParams<{ jobCategory: string }>()
  const [globalFilter, setGlobalFilter] = useState(null);
  const selectedProfiles = useSelector((state: RootState) => state.profile.selectedProfiles);
  const status = useSelector((state: RootState) => state.profile.selectedProfileStatus);
  let navigate = useNavigate();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchSelectedProfile());
    }
  }, [status, dispatch]);

  useEffect(() => {
    dispatch(fetchSelectedProfile());
  }, [jobCategory]);


  useEffect(() => {
    return () => {
      dispatch(reset())
    };
  }, []);

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
          <i className={" pi pi-map-marker"}>  </i> <small>{rowData.location}</small>
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
        <small>{rowData.currentCTC} LPA</small>
        </p>
      </div>
    );
  };

  const expectedCTCBodyTemplate = (rowData) => {
    return (
      <div className="align-items-center">
        <p className=" m-0 ">
        <small>{rowData.expectedCTC} LPA</small>
        </p>
      </div>
    );
  };

  const overallExperienceBodyTemplate = (rowData) => {
    return (
      <div className="align-items-center">
        <p className=" m-0 ">
         <small>{rowData.overallExp} Years</small>
        </p>
      </div>
    );
  };

  const relevantExperienceBodyTemplate = (rowData) => {
    return (
      <div className="align-items-center">
        <p className=" m-0 ">
          <small>{rowData.relevantExp} Years</small>
        </p>
      </div>
    );
  };

  const getSeverity = (status) => {
    switch (status) {
      case 'unqualified':
        return 'danger';

      case 'status':
        return 'success';

      case 'new':
        return 'info';

      case 'negotiation':
        return 'warning';

      case 'renewal':
        return null;
    }
  };

  const ratingBodyTemplate = (rowData) => {
    return <Rating value={rowData.overAllRating} readOnly cancel={false} />;
  };

  const onRowSelect = (event) => {
    navigate(`/client/profile-detail/shortlist/${event.data.profileId}`);
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
      {/* <section className="bg-light">
        <div className='row mb-1 BreadCrumb'>
          <div className='col-12'>
            <BreadCrumb model={items} home={home} />
          </div>
        </div>
      </section> */}
      <div className="">
        <div className='row' style={{ height: "90vh" }}>
          <div className='col-12  h-100'>
            <div className='card overflow-auto h-100 profile-table'>
              {status === "succeeded" &&
                <>
                  {(
                    <DataTable scrollable scrollHeight="flex" onRowSelect={onRowSelect} globalFilter={globalFilter} selectionMode="single" paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]} value={selectedProfiles} tableStyle={{ minWidth: '50rem' }}>
                      {/* <Column className='profile' field="profilePic" body={profileBodyTemplate} header=""></Column> */}
                      <Column frozen className="text-nowrap" headerClassName='column-title' field="firstName" body={nameBodyTemplate} header="Name"></Column>
                      <Column className="text-nowrap" headerClassName='column-title' field="location" body={locationBodyTemplate} header="Location"></Column>
                      <Column className="text-nowrap" headerClassName='column-title' field="currentCompany" body={currentCompanyBodyTemplate} header="Current Company"></Column>
                      <Column className="text-nowrap" headerClassName='column-title' field="designation" body={designationBodyTemplate} header="Designation"></Column>
                      <Column className="text-nowrap" headerClassName='column-title' field="OverallExp" body={overallExperienceBodyTemplate} header="Overall Experience"></Column>
                      <Column className="text-nowrap" headerClassName='column-title' field="relevantExp" body={relevantExperienceBodyTemplate} header="Relevant Experience"></Column>
                      <Column className="text-nowrap" headerClassName='column-title' field="currentCTC" body={currentCTCBodyTemplate} header="Current CTC"></Column>
                      <Column className="text-nowrap" headerClassName='column-title' field="expectedCTC" body={expectedCTCBodyTemplate} header="Expected CTC"></Column>
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

export default Selected
