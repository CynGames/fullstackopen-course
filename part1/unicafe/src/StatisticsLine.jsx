import React from 'react'

const StatisticsLine = ({ text, value, endText = "" }) =>
{
    return (
        <table>
            <tbody>
                <tr>
                    <td>{ text }</td>
                    <td>{ value } { endText } </td>
                </tr>
            </tbody>
        </table>
    )
}

export default StatisticsLine