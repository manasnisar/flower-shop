import React, { useState, useEffect, useRef } from 'react';
import MaterialTable from 'material-table';
import tableIcons from './tableIcons';
import createBrowserHistory from '../history';
import { ThemeProvider, createTheme } from '@mui/material';
import { connect } from 'react-redux';
import { deleteEntry } from '../actions';
import { MTableToolbar } from 'material-table';
import Apps from '@material-ui/icons/Apps';
const Home = (props) => {
  const prevTableLength = useRef(props.tableData.length);
  const [tableLength, setTableLength] = useState(props.tableData.length);
  useEffect(() => {
    //compare current with previous account and clear productId if changed
    if (tableLength !== prevTableLength) {
      setTableLength(props.tableData.length);
    }
    //set previous account for next render
    prevTableLength.current = props.tableData.length;
  }, [props.tableData]);
  console.log(props.tableData);
  const [options, setOptions] = useState({
    sorting: true,
    search: true,
    searchFieldAlignment: 'right',
    searchAutoFocus: true,
    searchFieldVariant: 'standard',
    filtering: false,
    paging: true,
    pageSizeOptions: [5, 10, 20, 25, 50, 100],
    pageSize: 10,
    paginationType: 'stepped',
    showFirstLastPageButtons: false,
    exportButton: true,
    exportAllData: true,
    exportFileName: 'TableData',
    addRowPosition: 'first',
    actionsColumnIndex: 0,
    showTextRowsSelected: false,
    toolbar: true,
    emptyRowsWhenPaging: false,
    searchFieldStyle: {},
    // selectionProps: (rowData) => ({
    //   disabled: rowData.age == null,

    //   // color: 'primary',
    // }),

    rowStyle: (data, index) => {
      let goodsType = data.goodsType;
      if (goodsType === 'flowers') {
        return { backgroundColor: '#f5f5f5' };
      }
    },
    grouping: false,
    columnsButton: true,

    headerStyle: {
      background: '#f44336',
      color: '#fff',
      fontSize: '1.2rem',
    },
  });

  const columns = [
    {
      title: 'Goods Type',
      field: 'Goods Type',
      type: 'string',
      sorting: true,
      filtering: false,
      // cellStyle: { background: '#009688' },
      headerStyle: { color: '#fff' },
      render: (rowData) => (
        <div
          style={{
            background:
              rowData.goodsType === 'flowers' ? '#008000aa' : '#f90000aa',
            borderRadius: '4px',
            padding: 10,
          }}
        >
          {rowData.goodsType}
        </div>
      ),
    },
    {
      title: 'Selesby',
      emptyValue: () => <em>Not Defined</em>,
      field: 'selesby',
      filtering: false,
      render: (item) => (
        <div>
          {item.selesby.endsWith('.pdf') ? (
            <a
              href={`http://localhost:8000/files/${item.selesby}`}
              target="_blank"
              className="material_doc"
              rel="noreferrer"
              border="3"
              height="50"
              width="50"
            >
              Doc <Apps />
            </a>
          ) : (
            <img
              src={`http://localhost:8000/files/${item.selesby}`}
              alt=""
              border="3"
              height="50"
              width="50"
            />
          )}
        </div>
      ),
    },
    {
      title: 'G.O.A.T',
      emptyValue: () => <em>Not Defined</em>,
      field: 'goat',
      filtering: false,
      render: (item) => (
        <div>
          {item.goat.endsWith('.pdf') ? (
            <a
              href={`http://localhost:8000/files/${item.goat}`}
              target="_blank"
              className="material_doc"
              rel="noreferrer"
              border="3"
              height="50"
              width="50"
            >
              Doc <Apps />
            </a>
          ) : (
            <img
              src={`http://localhost:8000/files/${item.goat}`}
              alt=""
              border="3"
              height="50"
              width="50"
            />
          )}
        </div>
      ),
    },
    {
      title: 'Polar Cool',
      emptyValue: () => <em>Not Defined</em>,
      field: 'polarCool',
      filtering: false,
      render: (item) => (
        <div>
          {item.polarCool.endsWith('.pdf') ? (
            <a
              href={`http://localhost:8000/files/${item.polarCool}`}
              target="_blank"
              className="material_doc"
              rel="noreferrer"
              border="3"
              height="50"
              width="50"
            >
              Doc <Apps />
            </a>
          ) : (
            <img
              src={`http://localhost:8000/files/${item.polarCool}`}
              alt=""
              border="3"
              height="50"
              width="50"
            />
          )}
        </div>
      ),
    },
    {
      emptyValue: () => <em>Not Defined</em>,
      title: 'Polar Cool Invoice Fee Check',
      filtering: false,
      field: 'polarCoolInvoiceFeeCheck',
      type: 'boolean',
    },
    {
      title: 'Polar Cool Invoice',
      emptyValue: () => <em>Not Defined</em>,
      field: 'polarCoolInvoice',
      filtering: false,
      render: (item) => (
        <div>
          {item.polarCoolInvoice.endsWith('.pdf') ? (
            <a
              href={`http://localhost:8000/files/${item.polarCoolInvoice}`}
              target="_blank"
              className="material_doc"
              rel="noreferrer"
              border="3"
              height="50"
              width="50"
            >
              Doc <Apps />
            </a>
          ) : (
            <img
              src={`http://localhost:8000/files/${item.polarCoolInvoice}`}
              alt=""
              border="3"
              height="50"
              width="50"
            />
          )}
        </div>
      ),
    },
    {
      emptyValue: () => <em>Not Defined</em>,
      title: 'truckItDetails',
      field: 'truckItDetails',
      sorting: false,
      filtering: false,
      type: 'string',
      // cellStyle: { background: '#009688' },
      headerStyle: { color: '#fff' },
    },
    {
      title: 'Truck It Docs',
      emptyValue: () => <em>Not Defined</em>,
      field: 'truckItDocs',
      filtering: false,
      render: (item) => (
        <div>
          {item.truckItDocs.endsWith('.pdf') ? (
            <a
              href={`http://localhost:8000/files/${item.truckItDocs}`}
              target="_blank"
              className="material_doc"
              rel="noreferrer"
              border="3"
              height="50"
              width="50"
            >
              Doc <Apps />
              {tableIcons.Attachment}
            </a>
          ) : (
            <img
              src={`http://localhost:8000/files/${item.truckItDocs}`}
              alt=""
              border="3"
              height="50"
              width="50"
            />
          )}
        </div>
      ),
    },
    {
      title: 'Date Of Arrival',
      emptyValue: () => <em>Not Defined</em>,
      field: 'dateofArrival',
      filtering: true,
      type: 'date',
    },
    {
      emptyValue: () => <em>Not Defined</em>,
      filtering: true,
      title: 'Warehouse Arrival Date',
      field: 'warehouseArrivalDate',
      type: 'date',
    },
    {
      emptyValue: () => <em>Not Defined</em>,
      filtering: true,
      title: 'Date From Courier',
      field: 'dateFromCourier',
      type: 'date',
    },
    {
      title: 'Packing List',
      emptyValue: () => <em>Not Defined</em>,
      field: 'packingList',
      filtering: false,
      render: (item) => (
        <div>
          {item.packingList.endsWith('.pdf') ? (
            <a
              href={`http://localhost:8000/files/${item.packingList}`}
              target="_blank"
              className="material_doc"
              rel="noreferrer"
              border="3"
              height="50"
              width="50"
            >
              Doc <Apps />
            </a>
          ) : (
            <img
              src={`http://localhost:8000/files/${item.packingList}`}
              alt=""
              border="3"
              height="50"
              width="50"
            />
          )}
        </div>
      ),
    },
    {
      title: 'Airway Bill',
      emptyValue: () => <em>Not Defined</em>,
      field: 'airwayBill',
      filtering: false,
      render: (item) => (
        <div>
          {item.airwayBill.endsWith('.pdf') ? (
            <a
              href={`http://localhost:8000/files/${item.airwayBill}`}
              target="_blank"
              className="material_doc"
              rel="noreferrer"
              border="3"
              height="50"
              width="50"
            >
              Doc <Apps />
            </a>
          ) : (
            <img
              src={`http://localhost:8000/files/${item.airwayBill}`}
              alt=""
              border="3"
              height="50"
              width="50"
            />
          )}
        </div>
      ),
    },
    {
      emptyValue: () => <em>Not Defined</em>,
      title: 'Airway Bill Number',
      field: 'airwayBillNumber',
      type: 'numeric',
    },
    {
      title: 'Tracking Email',
      field: 'trackingEmail',
      emptyValue: () => <em>Not Defined</em>,

      filterPlaceholder: 'filter',
    },
    {
      title: 'Estimated Time Of Arrival Start',
      emptyValue: () => <em>Not Defined</em>,
      field: 'estimatedTimeOfArrivalStart',
      type: 'date',
      dateSetting: { locale: 'en-GB' },
    },
    {
      emptyValue: () => <em>Not Defined</em>,
      title: 'Estimated Time Of Arrival End',
      field: 'estimatedTimeOfArrivalEnd',
      filtering: true,
      type: 'date',
      dateSetting: {
        format: 'dd/MM/yyyy',
      },
    },
    {
      emptyValue: () => <em>Not Defined</em>,
      title: 'Seleby Invoice Fee Check',
      field: 'selebyInvoiceFeeCheck',
      filtering: true,
      type: 'boolean',
    },
    {
      emptyValue: () => <em>Not Defined</em>,
      title: 'Seleby Related DocumentCheck',
      field: 'SELESBYrelatedDocumentCheck',
      filtering: true,
      type: 'boolean',
    },
    {
      title: 'Selesby Invoice',
      field: 'selesbyInvoice',
      filtering: false,
      emptyValue: () => <em>Not Defined</em>,
      render: (item) => (
        <div>
          {item.selesbyInvoice.endsWith('.pdf') ? (
            <a
              href={`http://localhost:8000/files/${item.selesbyInvoice}`}
              target="_blank"
              className="material_doc"
              rel="noreferrer"
              border="3"
              height="50"
              width="50"
            >
              Doc <Apps />
            </a>
          ) : (
            <img
              src={`http://localhost:8000/files/${item.selesbyInvoice}`}
              alt=""
              border="3"
              height="50"
              width="50"
            />
          )}
        </div>
      ),
    },

    {
      emptyValue: () => <em>Not Defined</em>,
      title: 'Clearance Date',
      field: 'clearanceDate',
      type: 'date',
    },

    {
      emptyValue: () => <em>Not Defined</em>,
      title: 'GOATInvoiceFeeCheck',
      field: 'GOATInvoiceFeeCheck',
      type: 'boolean',
    },
    {
      title: 'Polar Cool Booking Template',
      emptyValue: () => <em>Not Defined</em>,
      field: 'polarCoolBookingTemplate',
      filtering: false,
      render: (item) => (
        <div>
          {item.polarCoolBookingTemplate.endsWith('.pdf') ? (
            <a
              href={`http://localhost:8000/files/${item.polarCoolBookingTemplate}`}
              target="_blank"
              className="material_doc"
              rel="noreferrer"
              border="3"
              height="50"
              width="50"
            >
              Doc <Apps />
            </a>
          ) : (
            <img
              src={`http://localhost:8000/files/${item.polarCoolBookingTemplate}`}
              alt=""
              border="3"
              height="50"
              width="50"
            />
          )}
        </div>
      ),
    },
    {
      title: 'Polar Cool Labels ',
      emptyValue: () => <em>Not Defined</em>,
      field: 'polarCoolLabels',
      filtering: false,
      render: (item) => (
        <div>
          {item.polarCoolLabels.endsWith('.pdf') ? (
            <a
              href={`http://localhost:8000/files/${item.polarCoolLabels}`}
              target="_blank"
              className="material_doc"
              rel="noreferrer"
              border="3"
              height="50"
              width="50"
            >
              Doc <Apps />
            </a>
          ) : (
            <img
              src={`http://localhost:8000/files/${item.polarCoolLabels}`}
              alt=""
              border="3"
              height="50"
              width="50"
            />
          )}
        </div>
      ),
    },
    {
      emptyValue: () => <em>Not Defined</em>,
      title: 'Polar Cool Invoice Fee Check',
      field: 'polarCoolInvoiceFeeCheck',
      filtering: true,
      type: 'boolean',
    },
    {
      emptyValue: () => <em>Not Defined</em>,
      title: 'G.O.A.T Related Document Check',
      field: 'GOATrelatedDocumentCheck',
      type: 'boolean',
    },

    {
      title: 'G.O.A.T Invoice',
      emptyValue: () => <em>Not Defined</em>,
      field: 'goatInvoice',
      filtering: false,
      render: (item) => (
        <div>
          {item.goatInvoice.endsWith('.pdf') ? (
            <a
              href={`http://localhost:8000/files/${item.goatInvoice}`}
              target="_blank"
              className="material_doc"
              rel="noreferrer"
              border="3"
              height="50"
              width="50"
            >
              Doc <Apps />
            </a>
          ) : (
            <img
              src={`http://localhost:8000/files/${item.goatInvoice}`}
              alt=""
              border="3"
              height="50"
              width="50"
            />
          )}
        </div>
      ),
    },
    /////////////////////////////////
    ///////////////////
    ////////

    {
      title: 'Adelide And Perth Freight Forwarder',
      emptyValue: () => <em>Not Defined</em>,
      field: 'adelideAndPerthFreightForwarder',
      filtering: false,
      render: (item) => (
        <div>
          {item.adelideAndPerthFreightForwarder.endsWith('.pdf') ? (
            <a
              href={`http://localhost:8000/files/${item.adelideAndPerthFreightForwarder}`}
              target="_blank"
              className="material_doc"
              rel="noreferrer"
              border="3"
              height="50"
              width="50"
            >
              Doc <Apps />
            </a>
          ) : (
            <img
              src={`http://localhost:8000/files/${item.adelideAndPerthFreightForwarder}`}
              alt=""
              border="3"
              height="50"
              width="50"
            />
          )}
        </div>
      ),
    },
    ///////////////

    ///////////////

    ////////////

    ////

    {
      title: 'Adelaide Pallets',
      emptyValue: () => <em>Not Defined</em>,
      field: 'adelaidePallets',
      sorting: false,

      // cellStyle: { background: '#009688' },
      headerStyle: { color: '#fff' },
    },
    {
      title: 'Perth Pallets',
      emptyValue: () => <em>Not Defined</em>,
      field: 'perthPallets',
      sorting: false,

      // cellStyle: { background: '#009688' },
      headerStyle: { color: '#fff' },
    },
    {
      emptyValue: () => <em>Not Defined</em>,
      title: 'Mydney Pallets',
      field: 'sydneyPallets',
      sorting: false,

      // cellStyle: { background: '#009688' },
      headerStyle: { color: '#fff' },
    },
    {
      title: 'Melbourne Pallets',
      emptyValue: () => <em>Not Defined</em>,
      field: 'melbournePallets',
      sorting: false,

      // cellStyle: { background: '#009688' },
      headerStyle: { color: '#fff' },
    },
    //////////////////////
    {
      title: 'Adelaide Boxes',
      emptyValue: () => <em>Not Defined</em>,
      field: 'adelaideBoxes',
      sorting: false,

      // cellStyle: { background: '#009688' },
      headerStyle: { color: '#fff' },
    },
    {
      title: 'Perth Boxes',
      emptyValue: () => <em>Not Defined</em>,
      field: 'perthBoxes',
      sorting: false,

      // cellStyle: { background: '#009688' },
      headerStyle: { color: '#fff' },
    },
    {
      emptyValue: () => <em>Not Defined</em>,
      title: 'Mydney Boxes',
      field: 'sydneyBoxes',
      sorting: false,

      // cellStyle: { background: '#009688' },
      headerStyle: { color: '#fff' },
    },
    {
      title: 'Melbourne Boxes',
      emptyValue: () => <em>Not Defined</em>,
      field: 'melbourneBoxes',
      sorting: false,

      // cellStyle: { background: '#009688' },
      headerStyle: { color: '#fff' },
    },
  ];
  const defaultMaterialTheme = createTheme();
  const handleEdit = async (e, row) => {
    e.preventDefault();

    createBrowserHistory.push({
      pathname: '/newItem',
      state: { detail: { ...row, formType: 'edit', _id: row._id } },
    });
  };
  const handleDelete = async (e, row) => {
    e.preventDefault();

    props.deleteEntry(row);
  };
  return (
    <div className="App">
      <ThemeProvider theme={defaultMaterialTheme}>
        <MaterialTable
          actions={[
            {
              icon: tableIcons.Delete,
              tooltip: 'Delete',
              isFreeAction: false,
              onClick: (event, row) => {
                handleDelete(event, row);
              },
            },
            {
              icon: tableIcons.Edit,
              tooltip: 'Edit',
              isFreeAction: false,
              onClick: (event, row) => {
                handleEdit(event, row);
              },
            },

            {
              icon: tableIcons.Add,
              tooltip: 'Add',
              async: true,
              isFreeAction: true,
              onClick: () => {
                createBrowserHistory.push('/newItem');
              },
            },
            {
              icon: tableIcons.Group,
              tooltip: 'Group',
              isFreeAction: true,
              onClick: () => {
                setOptions({ ...options, grouping: !options.grouping });
              },
            },
            {
              icon: tableIcons.Filter,
              tooltip: 'Filter',
              async: true,
              isFreeAction: true,
              onClick: () => {
                setOptions({ ...options, filtering: !options.filtering });
              },
            },
          ]}
          columns={columns}
          components={{
            Toolbar: (props) => (
              <div
                className="container"
                style={{
                  fontize: '2rem',
                }}
              >
                <MTableToolbar {...props} />
              </div>
            ),
          }}
          icons={tableIcons}
          data={Object.values(props.tableData)}
          options={options}
          title={
            <div style={{ height: '2rem', fontSize: '2rem' }}>Shipments</div>
          }
        />
      </ThemeProvider>
    </div>
  );
};
const mapStateToProps = (state) => {
  return { tableData: state.shipments.data };
};
export default connect(mapStateToProps, { deleteEntry })(Home);
