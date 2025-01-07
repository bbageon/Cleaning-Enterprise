import React from 'react';
import { Button, Input, Radio, Select } from 'antd';
import {
    AdminContent,
    Col,
    ExpandableContainer,
    Row,
    Statistic,
    Table,
    Title
} from '../../../../../components';

const ReviewDashboardPresenter = ({
    // 검색어
    setKeywordCategory,

    reviews,
    requestCleans,

}) => {
    /* ===== STYLES ===== */
    const styles = {
        title: {
            fontSize: 24,
            fontWeight: 700,
            marginBottom: 20,
        },
        button: {
            width: 80,
            height: 40,
            fontSize: 15,
            fontWeight: 600,
            margin: '0px 4px',
        },
        form: {
            input: {
                large: {
                    width: 175,
                    marginRight: 8,
                },
                medium: {
                    width: 100,
                    marginRight: 8,
                },
            },
            button: {
                marginRight: 0,
            },
            date: {
                width: 120,
            },
            text: {
                fontSize: 13,
                fontWeight: 400,
            },
        },
    };

    /* ===== ITEMS ===== */
    const formItem = [
        
    ];

    /* ===== RENDER ===== */
    return (
        <AdminContent
            maxWidth={'100%'}
            padding={20}
            backgroundColor={'none'}
        >
            <Row>
                <Col x={24}>
                    <Title style={{ ...styles.title }}>대시보드</Title>

                    {/* 요약 */}
                    <AdminContent
                        maxWidth={'100%'}
                        padding={0}
                        backgroundColor={'none'}
                        style={{ marginBottom: 40, display: 'flex' }}
                    >
                        {[
                            { title: '총 요청 건수', value: requestCleans.length, suffix: '건' },
                            { title: '총 리뷰 개수', value: reviews.length, suffix: '개' },
                            { title: '리뷰 작성률', value: Math.floor(reviews.length / requestCleans.length * 100), suffix: '%' },
                        ].map((_item, _index) => (
                            <div
                                key={`${_item.title}-${_index}`}
                                style={{
                                    background: '#FFFFFF',
                                    borderRadius: 4,
                                    width: `calc(100% / 3)`, // 전체 너비에서 항목 갯수만큼 나누기
                                    marginRight: _index === 3 ? 0 : 3,
                                    padding: 20,
                                }}
                            >
                                <Statistic
                                    title={_item.title}
                                    value={_item.value}
                                    suffix={_item.suffix}
                                    direction={'row'}
                                    style={{ justifyContent: 'center' }}
                                />
                            </div>
                        ))}
                    </AdminContent>
                    {/* 요약 끝 */}

                    {/* 검색 필터 */}
                    {/* <AdminContent
                        maxWidth={'100%'}
                        padding={0}
                        backgroundColor={'none'}
                        style={{ marginBottom: 40 }}
                    >
                        <ExpandableContainer borderRadius={4} padding={20}>
                            {formItem.map((_item, _index) => (
                                <div
                                    key={`form_${_index}`}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '10px 0px',
                                    }}
                                >
                                    <div style={{ width: 120, fontSize: 13, fontWeight: 400 }}>
                                        <label>{_item.label}</label>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        {_item.form.map((_subitem, _subkey) => (
                                            <React.Fragment key={`input_${_subkey}`}>
                                                {_subitem.input}
                                            </React.Fragment>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </ExpandableContainer> */}

                        {/* 검색/초기화 버튼 */}
                        {/* <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%',
                                marginTop: 48,
                            }}
                        >
                            <Button
                                size='large'
                                type='primary'
                                style={{ ...styles.button, background: 'var(--primary-color)' }}
                            >
                                검색
                            </Button>
                            <Button size='large' style={{ ...styles.button }}>
                                초기화
                            </Button>
                        </div> */}
                        {/* 검색/초기화 버튼 끝 */}
                    {/* </AdminContent> */}
                    {/* 검색필터 끝 */}

                    {/* 검색 결과 */}
                    <AdminContent maxWidth={'100%'} borderRadius={4} padding={20}>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginBottom: 20,
                                justifyContent: 'space-between'
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <h4 style={{ fontSize: 14, fontWeight: 500, marginRight: 20 }}>
                                    검색 결과 총 <span>0</span>건
                                </h4>
                            </div>
                        </div>

                        <Table
                            data={reviews}
                            columns={[
                                {
                                    title: '리뷰번호',
                                    key: 'review_id',
                                },
                                {
                                    title: '리뷰점수',
                                    key: 'rating',
                                },
                                {
                                    title: '회원번호',
                                    key: 'user_id',
                                },
                                {
                                    title: '리뷰내용',
                                    key: 'review_message',
                                },
                            ]}
                        />
                    </AdminContent>
                </Col>
            </Row>
        </AdminContent>
    );
};

export default ReviewDashboardPresenter;