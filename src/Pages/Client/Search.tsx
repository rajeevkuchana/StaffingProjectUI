import React, { useEffect, useState } from 'react'
import { users } from '../../data/users'
import { Link, useNavigate } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { fetchClients } from '../../Redux/clientSlice'
import { AppDispatch, RootState } from '../../App/Store'
import { fetchSearchProfile } from '../../Redux/profileSlice'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Tag } from 'primereact/tag'
import './Search.css'
import { Rating } from 'primereact/rating'
import { BreadCrumb } from 'primereact/breadcrumb'
import Loader from '../../Components/Loader'
import { IconField } from 'primereact/iconfield'
import { InputText } from 'primereact/inputtext'
import { InputIcon } from 'primereact/inputicon'

const Search: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [globalFilter, setGlobalFilter] = useState(null);
  const searchProfiles = useSelector((state: RootState) => state.profile.searchProfiles);
  const status = useSelector((state: RootState) => state.profile.searchProfilesStatus);
  const error = useSelector((state: RootState) => state.profile.error);
  let navigate = useNavigate();
  const items = [{ label: 'Search', url: '/client/search' }, { label: 'Profile' }];
  const home = { icon: 'pi pi-home', url: '/home' }

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchSearchProfile());
    }
  }, [status, dispatch]);

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
          <p className="lead m-0 fs-6"><small>
          {rowData.firstName}  {rowData.lastName}

          </small>
        </p>
        <small className="text-body-secondary">{rowData.email}</small>
        <p className='text-body-secondary  m-0'>        <i className={" pi pi-phone"} ></i>
          <small className="text-body-secondary ">{rowData.phone}</small></p>

      </div>
    );
  };

  const interviewBodyTemplate = (rowData) => {
    return (
      <div className="align-items-center">
        <p className="lead m-0 fs-6">
          <i className={" pi pi-user"}>  </i> <small>{rowData.interviewBy}</small>
        </p>
        <small className="text-body-secondary m-0">{`${new Date( rowData.interviewDateTime).toLocaleDateString()} ${new Date( rowData.interviewDateTime).toLocaleTimeString()}`}</small>
      </div>
    );
  };


  const manageByBodyTemplate = (rowData) => {
    return (
      <div className="align-items-center">
        <p className="lead m-0 fs-6">
          <i className={" pi pi-user"}>  </i><small> {rowData.managedBy}</small>
        </p>
      </div>
    );
  };

  const locationBodyTemplate = (rowData) => {
    return (
      <div className="align-items-center">
        <p className="lead m-0 fs-6">
          <i className={" pi pi-map-marker"}>  </i> <small>{rowData.location}</small>
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
    navigate(`/client/search/${event.data.profileId}`);
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
    <><section className="bg-light">
      <div className='row mb-1 BreadCrumb'>
        <div className='col-12'>
          <BreadCrumb model={items} home={home} />
        </div>
      </div>
    </section><div className="card">
       {status === "succeeded" && <DataTable  onRowSelect={onRowSelect} globalFilter={globalFilter} selectionMode="single" paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} value={searchProfiles} tableStyle={{ minWidth: '50rem' }}>
          <Column className='profile' field="profilePic" body={profileBodyTemplate} header=""></Column>
          <Column filter field="firstName" body={nameBodyTemplate} header="Name"></Column>
          <Column filter field="location" body={locationBodyTemplate} header="Location"></Column>
          <Column filter field="interviewBy" body={interviewBodyTemplate} header="InterView"></Column>
          <Column filter field="managedBy" body={manageByBodyTemplate} header="Manage by"></Column>

          <Column filter field="overAllRating" body={ratingBodyTemplate} header="Rating"></Column>
        </DataTable>}

        {status === "loading" && <Loader></Loader>}
      </div></>
  )
}

export default Search
