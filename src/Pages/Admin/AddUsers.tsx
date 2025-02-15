import React, { useEffect, useRef, useState } from 'react';
import { ISignUpDetails } from '../../Types/AuthType';
import { userRole } from '../../Utils/Const';
import { AppDispatch, RootState } from '../../App/Store';
import { useDispatch, useSelector } from 'react-redux';
import { createUsers, fetchUsers, deleteUsers } from '../../Redux/userSlice';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import './admin.css'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';

const AddUsers: React.FC = () => {
  const [user, setUser] = useState<ISignUpDetails>({ email: '', password: '', company: '', role: userRole.client, username: '' });
  const dispatch = useDispatch<AppDispatch>();

  const users = useSelector((state: RootState) => state.user.users);
  const status = useSelector((state: RootState) => state.user.status);
  const deleteStatus = useSelector((state: RootState) => state.user.deleteStatus);
  const createStatus = useSelector((state: RootState) => state.user.createStatus);

  const [visible, setVisible] = useState(false);
  const toast = useRef<any>(null);
  const [globalFilter, setGlobalFilter] = useState(null);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (deleteStatus === 'succeeded' || createStatus === "succeeded") {
      dispatch(fetchUsers());
    }
  }, [deleteStatus, createStatus]);

  const createUser = (e) => {
    e.preventDefault()
    dispatch(createUsers(user))
    setUser({ email: '', password: '', role: userRole.client, username: '',company:'' })
    setVisible(false);
  }

  const deleteUser = (rowData: any) => {
    confirmDialog({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      defaultFocus: 'reject',
      acceptClassName: 'p-button-danger',
      accept: () => {
        dispatch(deleteUsers(rowData.id))
        setVisible(false);
      }
    });
  }

  const actionBodyTemplate = (rowData) => {
    return <Button size="small" style={{ borderRadius: '5px', width: "20px", height: "25px" }} icon="pi pi-times" onClick={() => deleteUser(rowData)} rounded severity="danger" aria-label="Cancel" />

  };

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <div>
        <button type="button" onClick={() => setVisible(true)} className="btn btn-primary">Create User</button>
      </div>
      <IconField iconPosition="left">
        <InputIcon className="pi pi-search" />
        <InputText type="search" onInput={(e: any) => setGlobalFilter(e.target.value)} placeholder="Search..." />
      </IconField>
    </div>
  );

  return (
    <>
      <Toast ref={toast} />
      <ConfirmDialog />
      <div className="card">
        <DataTable globalFilter={globalFilter} header={header} paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" value={users} tableStyle={{ minWidth: '50rem' }}>
          <Column field="username" sortable header="Full Name"></Column>
          <Column field="company" sortable header="Company"></Column>
          <Column field="email" sortable header="Email"></Column>
          <Column field="role" sortable header="Role"></Column>
          <Column body={actionBodyTemplate} header="Action"></Column>
        </DataTable>
      </div>
      <Dialog header={"Create New User"}  visible={visible} style={{ width: '50vw' }} onHide={() => { if (!visible) return; setVisible(false); }}>
        <form method='post' onSubmit={createUser}>
          <div className="gy-3 gy-md-4">

            <div className="col-12 from-row">
              <label className="form-label">Full Name <span className="text-danger">*</span></label>
              <input value={user.username} type="text" className="form-control" onChange={(e) => setUser({ ...user, username: e.target.value })} name="fullname" id="fullname" placeholder="Full Name" required />
            </div>
            <div className="col-12 from-row">
              <label className="form-label">Company <span className="text-danger">*</span></label>
              <input value={user.company} type="text" className="form-control" onChange={(e) => setUser({ ...user, company: e.target.value })} name="company" id="company" placeholder="Company" required />
            </div>
            <div className="col-12 from-row">
              <label className="form-label">Email <span className="text-danger">*</span></label>
              <input value={user.email} type="email" className="form-control" onChange={(e) => setUser({ ...user, email: e.target.value })} name="email" id="email" placeholder="name@example.com" required />
            </div>
            <div className="col-12 from-row">
              <label className="form-label">Password <span className="text-danger">*</span></label>
              <input value={user.password} type="password" onChange={(e) => setUser({ ...user, password: e.target.value })} className="form-control" name="password" id="password" required />
            </div>

            <div className="col-12 from-row">
              <label className="form-label">Role <span className="text-danger">*</span></label>
              <select value={user.role} onChange={(e) => setUser({ ...user, role: e.target.value })} className="form-control" aria-label="Default select example">
                <option selected>Admin</option>
                <option >Client</option>
                
                <option >Recruiter</option>
              </select>
            </div>
            <div className="col-12 from-row text-right">
              <button type="submit"  className="btn btn-primary">Create</button>
            </div>
          </div>
        </form>
      </Dialog>
    </>

  );
}

export default AddUsers;
