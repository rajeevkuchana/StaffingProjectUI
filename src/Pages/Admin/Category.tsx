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
import { BreadCrumb } from 'primereact/breadcrumb';
import { createJobCategory, deleteJobCategory, fetchJobCategory, updateJobCategory } from '../../Redux/profileSlice';
import CategoryEditor from '../../Components/CategoryEditor';

const Category: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  // Initial Data
  const initialData = {
    id: null,
    categoryCode: '',
    categoryDisplay: '',
    jobCategory: 'fulltime',
    categoryDescriptions: '',
    categoryIcon: '',
    jobProfilesSubCats: [
      {
        subCategoryCode: '',
        subCategoryDisplay: '',
        subCategoryDesc: '',
        subCategoryIcon: '',
      }
    ]
  }
  const jobCategories = useSelector((state: RootState) => state.profile.jobCategories);
  const status = useSelector((state: RootState) => state.user.status);
  const createStatus = useSelector((state: RootState) => state.profile.jobCategoryStatus);
  const [visible, setVisible] = useState(false);
  const [visibleCategory, setVisibleCategory] = useState(false);

  const toast = useRef<any>(null);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [formData, setFormData] = useState(initialData);
  const [subcategoryCode, setSubcategoryCode] = useState('');

  const [jobCategory, setJobCategory] = useState('fulltime');
  const [expandedRows, setExpandedRows] = useState<any>(null);
  const items = [{ label: 'Users' }];
  const home = { icon: 'pi pi-home', url: '/home' }

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchJobCategory(jobCategory || ''));
    }
  }, [status, dispatch]);

  useEffect(() => {
    dispatch(fetchJobCategory(jobCategory || ''));
  }, [jobCategory]);

  useEffect(() => {
    if (createStatus === "succeeded") {
      dispatch(fetchJobCategory(jobCategory || ''));
    }
  }, [createStatus]);

  const createCategory = (e) => {
    e.preventDefault()
    if (formData.id) {
      dispatch(updateJobCategory(formData))
    }
    else {
      dispatch(createJobCategory(formData))
    }
    setFormData(initialData)
    setVisible(false);
  }

  const removeJobCategory = (rowData: any) => {
    confirmDialog({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      defaultFocus: 'reject',
      acceptClassName: 'p-button-danger',
      accept: async () => {
        await dispatch(deleteJobCategory({categoryCode:rowData.categoryCode,jobCategory:jobCategory}))
        dispatch(fetchJobCategory(jobCategory))
        setVisible(false);
      }
    });
  }

  const handleInputChange = (event, index: number | null = null) => {
    const { name, value } = event.target;
    if (index !== null) {
      const updatedSubCats = [...formData.jobProfilesSubCats];
      // Create a shallow copy of the object at the specific index
      updatedSubCats[index] = { ...updatedSubCats[index], [name]: value }
      setFormData({ ...formData, jobProfilesSubCats: updatedSubCats });
    } else {
      // Handle change for main category fields
      setFormData({ ...formData, [name]: value });
    }
  };

  // Add a new subcategory
  const addSubCategory = () => {
    const newSubCategory = {
      subCategoryCode: '',
      subCategoryDisplay: '',
      subCategoryDesc: '',
      subCategoryIcon: '',
    };
    setFormData({
      ...formData,
      jobProfilesSubCats: [...formData.jobProfilesSubCats, newSubCategory],
    });
  };

  // Remove a subcategory
  const removeSubCategory = (index) => {
    const updatedSubCats = formData.jobProfilesSubCats.filter((_, i) => i !== index);
    setFormData({ ...formData, jobProfilesSubCats: updatedSubCats });
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className='flex gap-2'>
        <Button size="small" style={{ borderRadius: '5px', width: "20px", height: "25px" }} icon="pi pi-times" onClick={() => removeJobCategory(rowData)} rounded severity="danger" aria-label="Cancel" />
        <Button size="small" style={{ borderRadius: '5px', width: "20px", height: "25px" }} icon="pi pi-pen-to-square" onClick={() => { setFormData(rowData); setVisible(true) }} rounded aria-label="Cancel" />
      </div>
    )
  };

  const actionSubCategoryBodyTemplate = (rowData) => {
    return (
      <div className='flex gap-2'>
        <Button size="small" style={{ borderRadius: '5px', width: "20px", height: "25px" }} icon="pi pi-pen-to-square" onClick={() => { setVisibleCategory(true); setSubcategoryCode(rowData.subCategoryCode) }} rounded aria-label="Cancel" />
      </div>
    )
  };

  const subCategoryBodyTemplate = (rowData) => {
    return rowData.jobProfilesSubCats.length
  };

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <div>
        <button type="button" onClick={() => setVisible(true)} className="btn btn-primary">Create Category</button>
      </div>
      <div >
        <div className='flex gap-2'>
          <select value={jobCategory} name="jobCategory" onChange={(e: any) => { setJobCategory(e.target.value) }} className="form-control" aria-label="Default select example">
            <option value={'fulltime'}>Full-Time</option>
            <option value={'parttime'}>Part-Time</option>
            <option value={'c2h'}>Contract/C2H</option>
            <option value={'premium'}>Premium</option>
            <option value={'executive'}>Executive</option>
          </select>
          {/* <IconField iconPosition="left">
            <InputIcon className="pi pi-search" />
            <InputText type="search" onInput={(e: any) => setGlobalFilter(e.target.value)} placeholder="Search..." />
          </IconField> */}
        </div>

      </div>

    </div>
  );

  const footerContent = (
    <div>
      <Button label="Cancel" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
      <Button label="Create" icon="pi pi-check" onClick={createCategory} autoFocus />
    </div>
  );

  const allowExpansion = (rowData) => {
    return rowData.jobProfilesSubCats.length > 0;
  };

  const rowExpansionTemplate = (data) => {
    return (
      <div className="p-3">
        <DataTable value={data.jobProfilesSubCats}>
          <Column field="subCategoryCode" header="Sub Category Code" sortable></Column>
          <Column field="subCategoryDisplay" header="Sub Category" sortable></Column>
          <Column field="subCategoryDesc" header="Description" sortable></Column>
          {/* <Column body={actionSubCategoryBodyTemplate} field="subCategoryCode" header="Action"></Column> */}

        </DataTable>
      </div>
    );
  };

  return (
    <>
      <Toast ref={toast} />
      <ConfirmDialog />
      <div className="card">
        <DataTable globalFilter={globalFilter} header={header} paginator rows={5} rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" value={jobCategories} tableStyle={{ minWidth: '50rem' }}
          rowExpansionTemplate={rowExpansionTemplate}
          expandedRows={expandedRows} onRowToggle={(e: any) => setExpandedRows(e.data)}
          dataKey="categoryCode" >
          <Column expander={allowExpansion} style={{ width: '5rem' }} />
          <Column field="categoryDisplay" sortable header="Name"></Column>
          <Column field="categoryCode" sortable header="Code"></Column>
          <Column field="categoryDescriptions" style={{ width: '50%' }} sortable header="Descriptions"></Column>
          {/* <Column field="jobProfilesSubCats" sortable header="Role"></Column> */}
          <Column body={subCategoryBodyTemplate} header="Total Sub Category"></Column>
          <Column body={actionBodyTemplate} header="Action"></Column>
        </DataTable>
      </div>
      <Dialog footer={footerContent} header={"Create/Edit Category"} visible={visible} style={{ width: '50vw' }} onHide={() => { if (!visible) return; setVisible(false); }}>
        <form>
          {/* Category Info */}
          <div className='row'>

            <div className="col-6 form-row">
              <label className="form-label">Category Display</label>
              <input
                type="text"
                name="categoryDisplay"
                className="form-control"
                value={formData.categoryDisplay}
                placeholder="Category Display"
                onChange={handleInputChange}
              />
            </div>
            <div className="col-6 form-row">
              <label className="form-label">Category Code</label>
              <input
                type="text"
                name="categoryCode"
                className="form-control"
                value={formData.categoryCode}
                placeholder="Category Code"
                onChange={handleInputChange}
              />
            </div>
            <div className="col-12 form-row">
              <label className="form-label">Category Description</label>
              <textarea
                className="form-control"
                name="categoryDescriptions"
                value={formData.categoryDescriptions}
                placeholder="Category Description"
                onChange={handleInputChange}
              />
            </div>

            <div className="col-6 form-row">
              <label className="form-label">Category Icon</label>
              <input
                type="text"
                className="form-control"
                name="categoryIcon"
                value={formData.categoryIcon}
                placeholder="Category Icon URL"
                onChange={handleInputChange}
              />
            </div>
            <div className="col-6 form-row">
              <label className="form-label">Category</label>
              <select value={formData.jobCategory} name="jobCategory" onChange={handleInputChange} className="form-control" aria-label="Default select example">
                <option value={'fulltime'}>Full-Time</option>
                <option value={'parttime'}>Part-Time</option>
                <option value={'c2h'}>Contract/C2H</option>
                <option value={'premium'}>Premium</option>
                <option value={'executive'}>Executive</option>
              </select>
            </div>

          </div>

          {/* Subcategories Form Section */}
          <h6>Subcategories</h6>
          {formData.jobProfilesSubCats.map((subCategory, index) => (
            <div key={index}>
              <div className='row border-bottom mb-1'>
                <div className='text-end'>
                  <Button type='button' size="small" onClick={() => removeSubCategory(index)} style={{ borderRadius: '5px', width: "20px", height: "25px" }} icon="pi pi-times" rounded severity="danger" aria-label="Cancel" />
                </div>

                <div className="col-6 form-row">
                  <label className="form-label">Subcategory Code</label>
                  <input
                    type="text"
                    className="form-control"
                    name="subCategoryCode"
                    value={subCategory.subCategoryCode}
                    onChange={(e) => handleInputChange(e, index)}
                    placeholder="Subcategory Code"
                  />
                </div>

                <div className="col-6 form-row">
                  <label className="form-label">Subcategory Display</label>
                  <input
                    type="text"
                    className="form-control"
                    name="subCategoryDisplay"
                    value={subCategory.subCategoryDisplay}
                    onChange={(e) => handleInputChange(e, index)}
                    placeholder="Subcategory Display"
                  />
                </div>

                <div className="col-6 form-row">
                  <label className="form-label">Subcategory Description</label>
                  <input
                    type="text"
                    className="form-control"
                    name="subCategoryDesc"
                    value={subCategory.subCategoryDesc}
                    onChange={(e) => handleInputChange(e, index)}
                    placeholder="Subcategory Description"
                  />
                </div>

                <div className="col-6 form-row">
                  <label className="form-label">Subcategory Icon URL</label>
                  <input
                    type="text"
                    className="form-control"
                    name="subCategoryIcon"
                    value={subCategory.subCategoryIcon}
                    onChange={(e) => handleInputChange(e, index)}
                    placeholder="Subcategory Icon URL"
                  />
                </div>
              </div>
            </div>
          ))}

          <button type="button" className="btn btn-primary" onClick={addSubCategory}>
            Add Subcategory
          </button>
        </form>
      </Dialog>

      <Dialog header="Create/Edit Description" visible={visibleCategory} onHide={() => { if (!visibleCategory) return; setVisibleCategory(false); }}>
        <CategoryEditor jobCategoryCode={subcategoryCode} jobCategory={jobCategory}></CategoryEditor>
      </Dialog>
    </>
  );
}
export default Category;
