import React from 'react';
import { Button, Input, Select } from 'antd';
import {
    AdminContent,
    Col,
    ExpandableContainer,
    Row,
    Statistic,
    Table,
    Title
} from '../../../../../components';

const ServiceDashboardPresenter = ({
    services,
    setKeywordCategory,
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
        {
            label: '검색어',
            form: [
                {
                    input: (
                        <Select
                            size='large'
                            defaultValue={'id'}
                            onChange={(value) => setKeywordCategory(value)}
                            options={[
                                { label: '서비스번호', value: 'id' },
                                { label: '서비스명', value: 'name' },
                            ]}
                            style={{ ...styles.form.input.large }}
                        />
                    ),
                },
                {
                    input: (
                        <Input
                            size='large'
                            placeholder='검색어를 입력해주세요'
                            style={{ ...styles.form.input.large }}
                        />
                    ),
                },
            ],
        },
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
                            { title: '신규 서비스', value: 0 },
                            { title: '전체 서비스', value: services.length },
                            { title: '대표 서비스', value: 1 },
                            { title: '미이용 서비스', value: 0 },
                        ].map((_item, _index) => (
                            <div
                                key={`${_item.title}-${_index}`}
                                style={{
                                    background: '#FFFFFF',
                                    borderRadius: 4,
                                    width: `calc(100% / 4)`, // 전체 너비에서 항목 갯수만큼 나누기
                                    marginRight: _index === 3 ? 0 : 3,
                                    padding: 20,
                                }}
                            >
                                <Statistic
                                    title={_item.title}
                                    value={_item.value}
                                    suffix={'개'}
                                    direction={'row'}
                                    style={{ justifyContent: 'center' }}
                                />
                            </div>
                        ))}
                    </AdminContent>
                    {/* 요약 끝 */}

                    {/* 검색 필터 */}
                    <AdminContent
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
                        </ExpandableContainer>

                        {/* 검색/초기화 버튼 */}
                        <div
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
                        </div>
                        {/* 검색/초기화 버튼 끝 */}
                    </AdminContent>
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
                                    검색 결과 총 <span>{services.length}</span>건
                                </h4>
                            </div>
                        </div>

                        <Table
                            data={services}
                            columns={[
                                {
                                    title: '서비스번호',
                                    key: 'service_id',
                                },
                                {
                                    title: '서비스명',
                                    key: 'service_name',
                                },
                                {
                                    title: '서비스 카테고리',
                                    key: 'service_category',
                                },
                                {
                                    title: '평당 가격',
                                    key: 'price_per_meter',
                                },
                                {
                                    title: '시간당 가격',
                                    key: 'price_per_time',
                                },
                                {
                                    title: '업체번호',
                                    key: 'company_id',
                                },
                            ]}
                        />
                    </AdminContent>
                </Col>
            </Row>
        </AdminContent>
    );
};

export default ServiceDashboardPresenter;