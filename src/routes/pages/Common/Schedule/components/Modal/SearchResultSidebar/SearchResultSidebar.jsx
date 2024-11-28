import { useState } from 'react';
import ProfileBG from '../../../../../../../assets/bg/profile_bg.png';
import './SearchResultSidebar.css'
import { useGetUser } from '../../../../../../../hooks/UserHooks';
import { formatFullDate } from '../../../../../../../utils/dateUtils';
import { useGetOneDesignateCompanyCategory } from '../../../../../../../hooks/DesignateCompanyCategoryHooks';
import { useGetCompanyCategory } from '../../../../../../../hooks/CompanyCategoryHooks';
import { ServiceCategory } from '../../../../../../../enum';

export const SearchResultSidebar = ({
    setIsSearchResult,
    assignedEmployees,
    nonAssignedEmployees,

    isSelectRequest,
    selectedRequest,


    handleUnAssignEmployee,
    handleAssignEmployee,
    handleAssign,
    handleCancelAssign,

    showAssignmentEmployee,
    setShowAssignmentEmployee,
}) => {
    return (
        <>
            {
                isSelectRequest &&
                <div className="search-result-sidebar">
                    <div className="sidebar-card">
                        {selectedRequest?.name} 님의 요청
                    </div>
                    <div className="sidebar-card-wrap">
                        <div className='sidebar-card-label'>상세 정보</div>
                        <div className="sidebar-card">
                            <div>요청 지역</div>
                            <div>{selectedRequest?.clean_address}</div>
                            <div>요청 시간</div>
                            <div>{formatFullDate(selectedRequest?.request_date).split(' ')[0]}</div>
                            <div>요청 청소</div>
                            <div>{ServiceCategory[selectedRequest?.category]}</div>
                        </div>
                    </div>
                    {/* <div className="sidebar-card-wrap">
                        <div className='sidebar-card-label'>상세 정보</div>
                        <div className="sidebar-card">
                            <div>요청 지역</div>
                            <div>부산광역시 사상구 주례로 47</div>
                            <div>요청 시간</div>
                            <div>2024-10-01</div>
                            <div>요청 청소</div>
                            <div>화장실 청소/광택/세척</div>
                        </div>
                    </div> */}
                    <div className="sidebar-card-wrap">
                        <div className='sidebar-card-label'>배정 직원</div>
                        <div className="sidebar-card content row">
                            {/* <div className={`sidebar-card fit ${showAssignmentEmployee && 'can-cancel'}`}>
                        <img src={ProfileBG} alt="" />
                        <div>김민준</div>
                    </div>
                    <div className={`sidebar-card fit ${showAssignmentEmployee && 'can-cancel'}`}>
                        <img src={ProfileBG} alt="" />
                        <div>이서연</div>
                    </div> */}
                            {
                                assignedEmployees?.map(employee => {
                                    const { employee_name, name } = employee;
                                    return (
                                        <div
                                            className={`sidebar-card fit ${showAssignmentEmployee && 'can-cancel'}`}
                                            onClick={() => {
                                                showAssignmentEmployee && handleUnAssignEmployee(employee);
                                            }}
                                        >
                                            <img src={ProfileBG} alt="" />
                                            <div>{employee_name ? employee_name : name}</div>
                                        </div>
                                    )
                                })
                            }
                            {
                                !showAssignmentEmployee &&
                                <div
                                    className="sidebar-card fit point-cursor"
                                    onClick={() => setShowAssignmentEmployee(true)}
                                >
                                    <span className='plus-employee-text'>+</span>
                                </div>
                            }
                        </div>
                    </div>
                    {
                        showAssignmentEmployee &&
                        <div className="sidebar-card-wrap">
                            <div className='sidebar-card-label'>배정 가능 직원</div>
                            <div className="sidebar-card content row">
                                {/* <div className="sidebar-card fit can-add">
                            <img src={ProfileBG} alt="" />
                            <div>박지호</div>
                        </div>
                        <div className="sidebar-card fit can-add">
                            <img src={ProfileBG} alt="" />
                            <div>최유진</div>
                        </div>
                        <div className="sidebar-card fit can-add">
                            <img src={ProfileBG} alt="" />
                            <div>정예준</div>
                        </div> */}
                                {
                                    nonAssignedEmployees?.map(employee => {
                                        const { employee_name, name } = employee;
                                        return (
                                            <div
                                                className="sidebar-card fit can-add"
                                                onClick={() => {
                                                    showAssignmentEmployee && handleAssignEmployee(employee);
                                                }}
                                            >
                                                <img src={ProfileBG} alt="" />
                                                <div>{name ? name : employee_name}</div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className="assignment-buttons">
                                <button
                                    className='assignment'
                                    onClick={handleAssign}
                                >
                                    배정하기
                                </button>
                                <button
                                    className='cancel-assignment'
                                    onClick={handleCancelAssign}
                                >
                                    취소
                                </button>
                            </div>
                        </div>
                    }
                </div>
            }
        </>
    )
}