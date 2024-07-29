import React, { useEffect, useState } from 'react';
import { filterListCloudEngineering, filterListDataAI, filterListDevOps, filterListFullStack, filterListQA, jobType } from '../Utils/Const';
import { RadioButton } from 'primereact/radiobutton';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Checkbox } from 'primereact/checkbox';
import { AppDispatch } from '../App/Store';
import { useDispatch } from 'react-redux';
import { getUseEmail, getUserRole } from '../Utils/Utils';
import { Divider } from 'primereact/divider';
import { useLocation } from 'react-router-dom';

const FilterSidebar = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const [selectedJobType, setSelectedJobType] = useState(jobType[0]);
  const [selectedDataAI, setSelectedDataAI] = useState(Array<any>);
  const [selectedFullStack, setSelectedFullStack] = useState(Array<any>);
  const [selectedQA, setSelectedQA] = useState(Array<any>);
  const [selectedDevOps, setSelectedDevOps] = useState(Array<any>);
  const [selectedClouEngineering, setSelectedCloudEngineering] = useState(Array<any>);

  useEffect(() => {
    const jobCategory = location.pathname.split('/');
    let jobProfile: Array<any> = [];
    jobProfile = jobProfile.concat(selectedDataAI, selectedFullStack, selectedQA, selectedDevOps, selectedClouEngineering);
    props.parentCallback(
      {
        "jobCategory": jobCategory[jobCategory.length - 1],
        "jobType": selectedJobType.value,
        "jobProfile": jobProfile.map(x => x.text),
        "email": getUseEmail()
      }
    );
  }, [selectedJobType, selectedDataAI, selectedFullStack, selectedQA, selectedDevOps, selectedClouEngineering]);

  const ondDataAIChange = (e: any) => {
    let _selectedDataAI = [...selectedDataAI];
    if (e.checked)
      _selectedDataAI.push(e.value);
    else
      _selectedDataAI = selectedDataAI.filter(category => category.text !== e.value.text);
    setSelectedDataAI([..._selectedDataAI]);
  };

  const onFullStackChange = (e: any) => {
    let _selectedFullStack = [...selectedFullStack];
    if (e.checked)
      _selectedFullStack.push(e.value);
    else
      _selectedFullStack = selectedFullStack.filter(category => category.text !== e.value.text);
    setSelectedFullStack(_selectedFullStack);
  };

  const onQAChange = (e: any) => {
    let _selectedQA = [...selectedQA];
    if (e.checked)
      _selectedQA.push(e.value);
    else
      _selectedQA = selectedQA.filter(category => category.text !== e.value.text);
    setSelectedQA(_selectedQA);
  };

  const onDevOpsChange = (e: any) => {
    let _selectedDevOps = [...selectedDevOps];
    if (e.checked)
      _selectedDevOps.push(e.value);
    else
      _selectedDevOps = selectedDevOps.filter(category => category.text !== e.value.text);
    setSelectedDevOps(_selectedDevOps);
  };

  const onClouEngineeringChange = (e: any) => {
    let _selectedClouEngineering = [...selectedClouEngineering];
    if (e.checked)
      _selectedClouEngineering.push(e.value);
    else
      _selectedClouEngineering = selectedClouEngineering.filter(category => category.text !== e.value.text);
    setSelectedCloudEngineering(_selectedClouEngineering);
  };

  return (
    <div className='card sidebar' >
      {
        jobType.map(item => {
          return (
            <div key={item.value} className="flex align-items-center jobtype">
              <RadioButton inputId={item.value} name="category" value={item} onChange={(e) => setSelectedJobType(e.value)} checked={selectedJobType.value === item.value} />
              <label htmlFor={item.value} className="ml-2 p-component
              ">{item.text}</label>
            </div>
          )
        })
      }
      {/* <Divider /> */}
      <Accordion className='mt-1' multiple activeIndex={0}>
        {
          <AccordionTab header={filterListDataAI.name}>
            {
              filterListDataAI.data.map(d => {
                return (
                  <>
                    <div key={filterListDataAI.name} className="flex align-items-center">
                      <Checkbox onChange={ondDataAIChange} key={d.text} name="dataai" value={d} checked={selectedDataAI.some((a) => a.text === d.text)} />
                      <label htmlFor={d.text} className="ml-2">{d.text}</label>
                    </div>
                  </>
                )
              })
            }
          </AccordionTab>
        }
      </Accordion>
      <Accordion multiple activeIndex={0}>
        {
          <AccordionTab header={filterListFullStack.name}>
            {
              filterListFullStack.data.map(d => {
                return (
                  <>
                    <div key={filterListFullStack.name} className="flex align-items-center">
                      <Checkbox onChange={onFullStackChange} key={d.text} name="dataai" value={d} checked={selectedFullStack.some((a) => a.text === d.text)} />
                      <label htmlFor={d.text} className="ml-2">{d.text}</label>
                    </div>
                  </>
                )
              })
            }
          </AccordionTab>
        }
      </Accordion>
      <Accordion multiple activeIndex={0}>
        {
          <AccordionTab header={filterListQA.name}>
            {
              filterListQA.data.map(d => {
                return (
                  <>
                    <div key={filterListQA.name} className="flex align-items-center">
                      <Checkbox onChange={onQAChange} key={d.text} name="dataai" value={d} checked={selectedQA.some((a) => a.text === d.text)} />
                      <label htmlFor={d.text} className="ml-2">{d.text}</label>
                    </div>
                  </>
                )
              })
            }
          </AccordionTab>
        }
      </Accordion>
      <Accordion multiple activeIndex={0}>
        {
          <AccordionTab header={filterListDevOps.name}>
            {
              filterListDevOps.data.map(d => {
                return (
                  <>
                    <div key={filterListDevOps.name} className="flex align-items-center">
                      <Checkbox onChange={onDevOpsChange} key={d.text} name="dataai" value={d} checked={selectedDevOps.some((a) => a.text === d.text)} />
                      <label htmlFor={d.text} className="ml-2">{d.text}</label>
                    </div>
                  </>
                )
              })
            }
          </AccordionTab>
        }
      </Accordion>
      <Accordion multiple activeIndex={0}>
        {
          <AccordionTab header={filterListCloudEngineering.name}>
            {
              filterListCloudEngineering.data.map(d => {
                return (
                  <>
                    <div key={filterListCloudEngineering.name} className="flex align-items-center">
                      <Checkbox onChange={onClouEngineeringChange} key={d.text} name="dataai" value={d} checked={selectedClouEngineering.some((a) => a.text === d.text)} />
                      <label htmlFor={d.text} className="ml-2">{d.text}</label>
                    </div>
                  </>
                )
              })
            }
          </AccordionTab>
        }
      </Accordion>
    </div>
  );
};

export default FilterSidebar;
