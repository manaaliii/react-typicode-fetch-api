import React from 'react';

const DisplayTable:React.FC = ({dataSource, columns}) => {

    return (
        <table className='table'>
            <thead>
            <tr>
                {columns.map((column) => (
                    <th scope="col" key={column.key}>{column.title}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {dataSource.map((data, index) => (
                <tr key={index}>
                    {columns.map((column) => (
                        <td>
                            {
                                column.render ? column.render(data[column.dataIndex],data) :
                                    data[column.dataIndex]
                            }
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default DisplayTable;