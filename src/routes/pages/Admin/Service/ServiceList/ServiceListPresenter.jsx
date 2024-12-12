import { Button, Checkbox, Input, Radio, Select } from 'antd';
import {
    AdminContent,
    Col,
    ExpandableContainer,
    Row,
    Table,
    Title
} from '../../../../../components'
import React from 'react';

const ServiceListPresenter = ({

    // 서비스 카테고리
    setCheckCategory
}) => {

    /* ===== STYLES ===== */
    const styles = {
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
                marginRight: 8,
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
            label: '서비스 구분',
            form: [
                {
                    input: (
                        <Radio.Group
                            defaultValue={'used'}
                            options={[
                                { label: '이용 서비스', value: 'used' },
                                { label: '미이용 서비스', value: 'unused' },
                            ]}
                        />
                    ),
                },
            ],
        },
        {
            label: '카테고리 구분',
            form: [
                {
                    input: (
                        <Checkbox.Group
                            defaultValue={'used'}
                            options={[
                                { label: '이사/입주청소', value: 1 },
                                { label: '거주/생활청소', value: 2 },
                                { label: '거전/가구청소', value: 3 },
                                { label: '전문/특수청소', value: 4 },
                                { label: '사업장청소', value: 5 },
                                { label: '건물관리', value: 6 },
                            ]}
                            onChange={(value) => setCheckCategory(value)}
                        />
                    ),
                },
            ],
        },
        {
            label: '검색어',
            form: [
                {
                    input: (
                        <Select
                            size='large'
                            defaultValue={'id'}
                            // onChange={(value) => setKeywordCategory(value)}
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
        {
            label: '등록일',
            form: [
                {
                    input: (
                        <Radio.Group
                            defaultValue={'all'}
                            options={[
                                { label: '전체', value: 'all' },
                                { label: '오늘', value: 'today' },
                                { label: '1주일', value: 'week' },
                                { label: '1개월', value: 'month' },
                                { label: '3개월', value: '3month' },
                            ]}
                            optionType='button'
                            buttonStyle='solid'
                        />
                    ),
                },
            ],
        },
    ];

    /* ===== RENDER ===== */
    return (
        <AdminContent>
            <Row>
                <Col x={24}>
                    <Title>서비스 목록</Title>

                    {/* 검색 필터 */}
                    <AdminContent
                        padding={0}
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
                                    검색 결과 총 <span>0</span>건
                                </h4>
                            </div>
                        </div>

                        <Table
                            // data={newdata}
                            columns={[
                                {
                                    title: '회원번호',
                                    key: 'id',
                                },
                                {
                                    title: '회원명',
                                    key: 'name',
                                },
                                {
                                    title: '소셜아이디',
                                    key: 'social_id',
                                },
                                {
                                    title: '이메일',
                                    key: 'email',
                                },
                                {
                                    title: '전화번호',
                                    key: 'phone',
                                },
                            ]}
                        />
                    </AdminContent>
                </Col>
            </Row>

        </AdminContent>
    );
};

export default ServiceListPresenter;