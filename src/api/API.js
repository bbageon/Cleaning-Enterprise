import ApiManager from './ApiManager';
const $http = new ApiManager();

export const getToday = () => {
  return Math.floor(Date.now() / 1000);
}

export const getTimeFormat = (dateFormat) => {
  const date = new Date(dateFormat);
  return Math.floor(date.getTime() / 1000);
}

export const getDate = (timestamp) => {
  return new Date(timestamp * 1000);
}

const parameterToPath = (path, params = {}) => {
  const keys = Object.keys(params);
  let newStr = path;
  for (let key of keys) {
    newStr = newStr.replace(`:${key}`, params[key]);
  }
  return newStr;
};

const API = {
  /**
   * ====================
   *         인 증
   * ====================
   */
  /**
   * 사이트 토큰 발급
  */
  getCounselors: () => $http.get('/counselor'),

  /**
   * 토큰 검사
  */
  postAuthCheck: () => $http.post('/auth/check'),

  /**
   * 고객 로그인
  */
  postAuthUserSignin: (body) => $http.post('/auth/user/signin', body),

  /**
   * 고객 카카오 로그인
   */
  postAuthUserKakaoSignin: (body) => $http.post('/auth/user/kakao/signin', body),

  /**
   * 고객 네이버 로그인
   */
  postAuthUserNaverSignin: (body) => $http.post('/auth/user/naver/signin', body),

  /**
   * 직원 로그인
   */
  postEmployeeSignin: (body) => $http.post('/auth/employee/signin', body),


  /**
   * ====================
   *         고 객
   * ====================
   * Hook 작성 완료
   */
  /*
   * 고객 생성
   */
  postUser: (body) => $http.post('/user', body),

  /*
   * 고객 전체 조회
   */
  getUser: () => $http.get('/user'),

  /*
   * 고객 단일 조회
   */
  getOneUser: (user_id) => $http.get(parameterToPath('/user/:user_id', { user_id })),

  /*
   * 프로필 정보 조회
   */
  getProfile: (user_id) => $http.get(parameterToPath('/user/profile/:user_id', { user_id })),

  /**
   * 고객 정보 수정
   */
  putUser: (user_id, body) => $http.put(parameterToPath('/user/:user_id', { user_id }), body),

  /**
   * 고객 정보 삭제
   */
  deleteUser: (user_id) => $http.delete(parameterToPath('/user/:user_id', { user_id })),


  /**
   * ====================
   *       고 객 주 소
   * ====================
   * Hook 작성 완료
   */
  /**
   * 고객 주소 생성
   */
  postUserAddress: (body) => $http.post('/user_address', body),

  /**
   * 고객 주소 전체 조회
   */
  getUserAddresses: () => $http.get('/user_address'),

  /**
   * 고객 주소 단일 조회
   */
  getOneUserAddress: (user_address_id) => $http.get(parameterToPath('/user_address/user/:user_address_id', { user_address_id })),

  /**
   * 고객 주소 조회
   */
  getUserAddress: (user_id) => $http.get(parameterToPath('/user_address/:user_id', { user_id })),

  /**
   * 고객 주소 수정
   */
  putUserAddress: (user_address_id, body) => $http.put(parameterToPath('/user_address/:user_address_id', { user_address_id }), body),

  /**
   * 고객 주소 삭제
   */
  deleteUserAddress: (user_address_id) => $http.delete(parameterToPath('/user_address/:user_address_id', { user_address_id })),


  /**
   * =====================
   *       청 소 업 체
   * =====================
   * Hook 작성 완료
   */
  /**
   * 청소업체 생성
   */
  postCompany: (body) => $http.post('/company', body),

  /**
   * 청소업체 전제 조회
   */
  getCompany: () => $http.get('/company'),

  /**
   * 청소업체 단일 조회
   */
  getOneCompany: (company_id) => $http.get(parameterToPath('/company/:company_id', { company_id })),

  /**
   * 청소업체 정보 수정
   */
  putCompany: (company_id, body) => $http.put(parameterToPath('/company/:company_id', { company_id }), body),

  /**
   * 청소업체 삭제
   */
  deleteCompany: (company_id) => $http.delete(parameterToPath('/company/:company_id', { company_id })),


  /**
   * =============================
   *       청 소 업 체 카 테 고 리
   * =============================
   * Hook 작성 완료
   */
  /**
   * 청소업체 카테고리 생성
   */
  postCompanyCategory: (body) => $http.post('/company_category', body),

  /**
   * 청소업체 카테고리 전체 조회
   */
  getCompanyCategory: () => $http.get('/company_category'),

  /**
   * 청소업체 카테고리 단일 조회
   */
  getOneCompanyCategory: (category_id) => $http.get(parameterToPath('/company_category/:category_id', { category_id })),

  /**
   * 청소업체 카테고리 수정
   */
  putCompanyCategory: (category_id, body) => $http.put(parameterToPath('/company_category/:category_id', { category_id }), body),

  /**
   * 청소업체 카테고리 삭제
   */
  deleteCompanyCategory: (category_id) => $http.delete(parameterToPath('/company_category/:category_id', { category_id })),


  /**
   * ==================================
   *       청 소 업 체 카 테 고 리 지 정
   * ==================================
   * Hook 작성 완료
   */
  /**
   * 청소업체 카테고리 지정 생성
   */
  postDesignateCompanyCategory: (body) => $http.post('/designate_company_category', body),

  /**
   * 청소업체 카테고리 지정 전체 조회
   */
  getDesignateCompanyCategory: () => $http.get('/designate_company_category'),

  /**
   * 청소업체 카테고리 지정 단일 조회
   */
  getOneDesignateCompanyCategory: (designate_id) => $http.get(parameterToPath('/designate_company_category/:designate_id', { designate_id })),

  /**
   * 청소업체의 청소업체 카테고리 전체 조회
   */
  getCompanyDesignateCompanyCategory: (company_id) => $http.get(parameterToPath('/designate_company_category/company/:company_id', { company_id })),

  /**
   * 청소업체 카테고리의 청소업체 전체 조회 // 카테고리별로 청소업체를 보여줌
   */
  getCategoryDesignateCompanyCategory: (company_category_id) => $http.get(parameterToPath('/designate_company_category/company_category/:company_category_id', { company_category_id })),

  /**
   * 청소업체 카테고리 지정 수정
   */
  putDesignateCompanyCategory: (designate_id, body) => $http.put(parameterToPath('/designate_company_category/:designate_id', { designate_id }), body),

  /**
   * 청소업체 카테고리 지정 삭제
   */
  deleteDesignateCompanyCategory: (designate_id) => $http.delete(parameterToPath('/designate_company_category/:designate_id', { designate_id })),


  /**
   * ==================
   *       채 팅 방
   * ==================
   * Hook 작성 완료
   */
  /**
   * 채팅방 생성
   */
  postChatRoom: (body) => $http.post('/chat_room', body),

  /**
   * 채팅방 전체 조회
   */
  getChatRoom: () => $http.get('/chat_room'),

  /**
   * 채팅방 단일 조회
   */
  getOneChatRoom: (room_id) => $http.get(parameterToPath('/chat_room/:room_id', { room_id })),

  /**
   * 고객 채팅방 조회
   */
  getUserChatRoom: (user_id) => $http.get(parameterToPath('/chat_room/user/:user_id', { user_id })),

  /**
   * 청소업체 채팅방 조회
   */
  getCompanyChatRoom: (company_id) => $http.get(parameterToPath('/chat_room/company/:company_id', { company_id })),

  /**
   * 채팅방 수정
  */
  putChatRoom: (room_id, body) => $http.put(parameterToPath('/chat_room/:room_id', { room_id }), body),

  /**
   * 채팅방 삭제
   */
  deleteChatRoom: (room_id) => $http.delete(parameterToPath('/chat_room/:room_id', { room_id })),


  /**
   * ======================
   *       채 팅 메 시 지
   * ======================
   * Hook 작성 완료
   */
  /**
   * 채팅 메시지 생성
   */
  postChatMessage: (body) => $http.post('/chat_message', body),

  /**
   * 채팅 메시지 전체 조회
   */
  getChatMessage: () => $http.get('/chat_message'),

  /**
   * 채팅 메시지 단일 조회
   */
  getChatOneMessage: (message_id) => $http.get(parameterToPath('/chat_message/:message_id', { message_id })),

  /**
   * 채팅방 메시지 조회
   */
  getOneChatMessage: (room_id) => $http.get(parameterToPath('/chat_message/chat/:room_id', { room_id })),

  /**
   * 채팅 메시지 수정
  */
  putChatMessage: (message_id, body) => $http.put(parameterToPath('/chat_message/:message_id', { message_id }), body),

  /**
   * 채팅 메시지 삭제
   */
  deleteChatMessage: (message_id) => $http.delete(parameterToPath('/chat_message/:message_id', { message_id })),


  /**
   * =================
   *       견 적 서 
   * =================
   * Hook 작성 완료
   */
  /**
   * 견적서 생성
   */
  postRequestEstimate: (body) => $http.post('/estimate', body),
  
  /**
   * 견적서 전체 조회
   */
  getRequestEstimate: () => $http.get('/estimate'),

  /**
   * 견적서 단일 조회
   */
  getOneRequestEstimate: (estimate_id) => $http.get(parameterToPath('/estimate/:estimate_id', { estimate_id })),

  /**
   * 고객 견적서 조회
   */
  getUserRequestEstimate: (user_id) => $http.get(parameterToPath('/estimate/user/:user_id', { user_id })),

  /**
   * 견적서 수정
  */
  putRequestEstimate: (estimate_id, body) => $http.put(parameterToPath('/estimate/:estimate_id', { estimate_id }), body),

  /**
   * 견적서 삭제
   */
  deleteRequestEstimate: (estimate_id) => $http.delete(parameterToPath('/estimate/:estimate_id', { estimate_id })),


  /**
   * =================
   *     장 바 구 니
   * =================
   * Hook 작성 완료
   */
  /**
   * 장바구니 생성
   */
  postCart: (body) => $http.post('/cart', body),

  /**
   * 장바구니 전체 조회
   */
  getCart: () => $http.get('/cart'),

  /**
   * 장바구니 단일 조회
   */
  getOneCart: (cart_id) => $http.get(parameterToPath('/cart/:cart_id', { cart_id })),

  /**
   * 고객 장바구니 조회
  */
  getUserCart: (user_id) => $http.get(parameterToPath('/cart/user/:user_id', { user_id })),

  /**
   * 장바구니 수정
   */
  putCart: (cart_id, body) => $http.put(parameterToPath('/cart/:cart_id', { cart_id }), body),

  /**
   * 장바구니 삭제
   */
  deleteCart: (cart_id) => $http.delete(parameterToPath('/cart/:cart_id', { cart_id })),


  /**
   * =====================
   *     장 바 구 니 목 록
   * =====================
   * Hook 작성 완료
   */
  /**
   * 장바구니 목록 생성
   */
  postCartList: (body) => $http.post('/cart_list', body),

  /**
   * 장바구니 목록 전체 조회
   */
  getCartList: () => $http.get('/cart_list'),

  /**
   * 장바구니 목록 단일 조회
   */
  getOneCartList: (cart_list_id) => $http.get(parameterToPath('/cart_list/:cart_list_id', { cart_list_id })),

  /**
   * 장바구니의 장바구니 목록 조회
  */
  getCompanyCartList: (cart_id) => $http.get(parameterToPath('/cart_list/cart/:cart_id', { cart_id })),

  /**
   * 장바구니 목록 서비스 조회
  */
  getServiceCartList: (service_id) => $http.get(parameterToPath('/cart_list/service/:service_id', { service_id })),

  /**
   * 장바구니 목록 수정
   */
  putCartList: (cart_list_id, body) => $http.put(parameterToPath('/cart_list/:cart_list_id', { cart_list_id }), body),

  /**
   * 장바구니 목록 삭제
   */
  deleteCartList: (cart_list_id) => $http.delete(parameterToPath('/cart_list/:cart_list_id', { cart_list_id })),


  /**
   * ============
   *     리 뷰
   * ============
   * Hook 작성 완료
   */
  /**
   * 리뷰 생성
   */
  postReview: (body) => $http.post('/review', body),

  /**
   * 리뷰 전체 조회
   */
  getReview: () => $http.get('/review'),

  /**
   * 리뷰 단일 조회
   */
  getOneReview: (review_id) => $http.get(parameterToPath('/review/:review_id', { review_id })),

  /**
   * 고객 작성 리뷰 조회
  */
  getUserReview: (user_id) => $http.get(parameterToPath('/review/user/:user_id', { user_id })),

  /**
   * 청소업체 작성된 리뷰 조회
  */
  getCompanyReview: (company_id) => $http.get(parameterToPath('/review/company/:company_id', { company_id })),

  /**
   * 리뷰 수정
   */
  putReview: (review_id, body) => $http.put(parameterToPath('/review/:review_id', { review_id }), body),

  /**
   * 리뷰 삭제
   */
  deleteReview: (review_id) => $http.delete(parameterToPath('/review/:review_id', { review_id })),


  /**
   * ===================
   *     리 뷰 이 미 지
   * ===================
   * Hook 작성 완료
   */
  /**
   * 리뷰 이미지 생성
   */
  postReviewImage: (body) => $http.post('/review_image', body),

  /**
   * 리뷰 이미지 전체 조회
   */
  getReviewImage: () => $http.get('/review_image'),

  /**
   * 리뷰 이미지 단일 조회
   */
  getOneReviewImage: (review_image_id) => $http.get(parameterToPath('/review_image/:review_image_id', { review_image_id })),

  /**
   * 리뷰에 대한 리뷰 이미지 조회
  */
  getReviewImageAboutReview: (review_id) => $http.get(parameterToPath('/review_image/review/:review_id', { review_id })),

  /**
   * 리뷰 이미지 수정
   */
  putReviewImage: (review_image_id, body) => $http.put(parameterToPath('/review_image/:review_image_id', { review_image_id }), body),

  /**
   * 리뷰 이미지 삭제
   */
  deleteReviewImage: (review_image_id) => $http.delete(parameterToPath('/review_image/:review_image_id', { review_image_id })),


  // /**
  //  * ===================
  //  *     서 비 스 옵 션
  //  * ===================
  //  */
  // /**
  //  * 서비스 옵션 생성
  //  */
  // postServiceOption: (body) => $http.post('/service_option', body),

  // /**
  //  * 서비스 옵션 전체 조회
  //  */
  // getServiceOption: () => $http.get('/service_option'),

  // /**
  //  * 서비스 옵션 단일 조회
  //  */
  // getOneServiceOption: (service_option_id) => $http.get(parameterToPath('/service_option/:service_option_id', { service_option_id })),

  // /**
  //  * 청소업체 서비스 옵션 조회
  //  */
  // getCompanyServiceOption: (company_id) => $http.get(parameterToPath('/company/:company_id', { company_id })),

  // /**
  //  * 서비스 옵션 수정
  //  */
  // putServiceOption: (service_option_id, body) => $http.put(parameterToPath('/service_option/:service_option_id', { service_option_id }), body),

  // /**
  //  * 서비스 옵션 삭제
  //  */
  // deleteServiceOption: (service_option_id) => $http.delete(parameterToPath('/service_option/:service_option_id', { service_option_id })),


  /**
   * ==============
   *      직 원
   * ==============
   */
  /**
   * 직원 생성
   */
  postEmployee: (body) => $http.post('/employee', body),

  /**
   * 직원 전체 조회
   */
  getEmployee: () => $http.get('/employee'),

  /**
   * 직원 단일 조회
   */
  getOneEmployee: (employee_id) => $http.get(parameterToPath('/employee/:employee_id', { employee_id })),

  /**
   * 청소업체 직원 조회
  */
  getCompanyEmployee: (company_id) => $http.get(parameterToPath('/employee/company/:company_id', { company_id })),

  /**
   * 직원 수정
   */
  putEmployee: (employee_id, body) => $http.put(parameterToPath('/employee/:employee_id', { employee_id }), body),

  /**
   * 직원 삭제
   */
  deleteEmployee: (employee_id) => $http.delete(parameterToPath('/employee/:employee_id', { employee_id })),


  /**
   * =======================
   *      청 소 업 체 일 정
   * =======================
   */
  /**
   * 청소업체 일정 생성
   */
  postCompanySchedule: (body) => $http.post('/company_schedule', body),

  /**
   * 청소업체 일정 전체 조회
   */
  getCompanySchedule: () => $http.get('/company_schedule'),

  /**
   * 청소업체 일정 단일 조회
   */
  getOneCompanySchedule: (schedule_id) => $http.get(parameterToPath('/company_schedule/:schedule_id', { schedule_id })),

  /**
   * 청소업체의 일정 조회
   */
  getCompanyCompanySchedule: (company_id) => $http.get(parameterToPath('/company_schedule/company/:company_id', { company_id })),

  /**
   * 청소업체 일정 수정
   */
  putCompanySchedule: (schedule_id, body) => $http.put(parameterToPath('/company_schedule/:schedule_id', { schedule_id }), body),

  /**
   * 청소업체 일정 삭제
   */
  deleteCompanySchedule: (schedule_id) => $http.delete(parameterToPath('/company_schedule/:company_id', { schedule_id })),


  /**
   * ===============
   *     서 비 스 
   * ===============
   * Hook 작성 완료
   */
  /**
   * 서비스 생성
   */
  postService: (body) => $http.post('/service', body),

  /**
   * 서비스 전체 조회
   */
  getService: () => $http.get('/service'),

  /**
   * 서비스 단일 조회
   */
  getOneService: (service_id) => $http.get(parameterToPath('/service/:service_id', { service_id })),

  /**
   * 청소업체 서비스 조회
  */
  getCompanyService: (company_id) => $http.get(parameterToPath('/service/company/:company_id', { company_id })),

  /**
   * 서비스 수정
   */
  putService: (service_id, body) => $http.put(parameterToPath('/service/:service_id', { service_id }), body),

  /**
   * 서비스 삭제
   */
  deleteService: (service_id) => $http.delete(parameterToPath('/service/:service_id', { service_id })),


  /**
   * =================
   *     리 뷰 답 변
   * =================
   * Hook 작성 완료
   */
  /**
   * 리뷰 답변 생성
   */
  postReviewAnswer: (body) => $http.post('/review_answer', body),

  /**
   * 리뷰 답변 전체 조회
   */
  getReviewAnswer: () => $http.get('/review_answer'),

  /**
   * 리뷰 답변 단일 조회
   */
  getOneReviewAnswer: (review_answer_id) => $http.get(parameterToPath('/review_answer/:review_answer_id', { review_answer_id })),

  /**
   * 리뷰에 대한 리뷰 답변 조회
   */
  getReviewOneReviewAnswer: (review_id) => $http.get(parameterToPath('/review_answer/review/:review_id', { review_id })),

  /**
   * 청소업체 리뷰 답변 조회
   */
  getCompanyOneReviewAnswer: (company_id) => $http.get(parameterToPath('/review_answer/company/:company_id', { company_id })),

  /**
   * 리뷰 답변 수정
   */
  putReviewAnswer: (review_answer_id, body) => $http.put(parameterToPath('/review_answer/:review_answer_id', { review_answer_id }), body),

  /**
   * 리뷰 답변 삭제
   */
  deleteReviewAnswer: (review_answer_id) => $http.delete(parameterToPath('/review_answer/:review_answer_id', { review_answer_id })),


  /**
   * ====================
   *       청 소 요 청
   * ====================
   * Hook 작성 완료
   */
  /**
   * 청소요청 생성
   */
  postRequestClean: (body) => $http.post('/request_clean', body),

  /**
   * 청소요청 전체 조회
   */
  getRequestClean: () => $http.get('/request_clean'),

  /**
   * 청소요청 단일 조회
   */
  getOneRequestClean: (request_clean_id) => $http.get(parameterToPath('/request_clean/:request_clean_id', { request_clean_id })),

  /**
   * 고객 청소요청 조회
   */
  getUserRequestClean: (user_id) => $http.get(parameterToPath('/request_clean/user/:user_id', { user_id })),

  /**
   * 청소업체 청소요청 조회
   */
  getCompanyRequestClean: (company_id) => $http.get(parameterToPath('/request_clean/company/:company_id', { company_id })),

  /**
   * 요청 목록 청소요청 조회(1년 단위)
   */
  getYearRequestClean: (today) => $http.get(parameterToPath('/request_clean/schedule/:today', { today })),

  /**
   * 특정 기간의 청소요청 조회
   */
  getPeriodRequestClean: (first_date, last_date) => $http.get(parameterToPath('/request_clean/schedule/:first_date/:last_date', { first_date, last_date })),

  /**
   * 요청 목록 특정 날짜의 청소요청 조회
   */
  getDateRequestClean: (date) => $http.get(parameterToPath('/request_clean/date/:date', { date })),

  /**
   * 청소요청 수정
  */
  putRequestClean: (request_clean_id, body) => $http.put(parameterToPath('/request_clean/:request_clean_id', { request_clean_id }), body),

  /**
   * 청소요청 삭제
   */
  deleteRequestClean: (request_clean_id) => $http.delete(parameterToPath('/request_clean/:request_clean_id', { request_clean_id })),


  /**
   * ================================
   *       청 소 요 청 서 비 스 목 록
   * ================================
   * Hook 작성 완료
   */
  /**
   * 청소요청 서비스 목록 생성
   */
  postRequestCleanServiceList: (body) => $http.post('/request_clean_service_list', body),

  /**
   * 청소요청 서비스 목록 전체 조회
   */
  getRequestCleanServiceList: () => $http.get('/request_clean_service_list'),

  /**
   * 청소요청 서비스 목록 단일 조회
   */
  getOneRequestCleanServiceList: (request_clean_service_list_id) => $http.get(parameterToPath('/request_clean_service_list/:request_clean_service_list_id', { request_clean_service_list_id })),

  /**
   * 청소요청의 청소요청 서비스 목록 단일 조회
   */
  getCleanRequestCleanServiceList: (request_clean_id) => $http.get(parameterToPath('/request_clean_service_list/request_clean/:request_clean_id', { request_clean_id })),

  /**
   * 청소요청 서비스 목록 수정
   */
  putRequestCleanServiceList: (request_clean_service_list_id, body) => $http.put(parameterToPath('/request_clean_service_list/:request_clean_service_list_id', { request_clean_service_list_id }), body),

  /**
   * 청소요청 서비스 목록 삭제
   */
  deleteRequestCleanServiceList: (request_clean_service_list_id) => $http.delete(parameterToPath('/request_clean_service_list/:request_clean_service_list_id', { request_clean_service_list_id })),


  /**
   * ==============================
   *       견 적 서 서 비 스 목 록
   * ==============================
   * Hook 작성 완료
   */
  /**
   * 견적서 서비스 목록 생성
   */
  postEstimateServiceList: (body) => $http.post('/estimate_service_list', body),

  /**
   * 견적서 서비스 목록 전체 조회
   */
  getEstimateServiceList: () => $http.get('/estimate_service_list'),

  /**
   * 견적서 서비스 목록 단일 조회
   */
  getOneEstimateServiceList: (estimate_service_list_id) => $http.get(parameterToPath('/estimate_service_list/:estimate_service_list_id', { estimate_service_list_id })),

  /**
   * 견적서의 견적서 서비스 목록 단일 조회
   */
  getEstimateEstimateServiceList: (estimate_id) => $http.get(parameterToPath('/estimate_service_list/estimate/:estimate_id', { estimate_id })),

  /**
   * 청소업체의 견적서 서비스 목록 단일 조회
   */
  getCompanyEstimateServiceList: (company_id) => $http.get(parameterToPath('/estimate_service_list/company/:company_id', { company_id })),

  /**
   * 견적서 서비스 목록 수정
   */
  putEstimateServiceList: (estimate_service_list_id, body) => $http.put(parameterToPath('/estimate_service_list/:estimate_service_list_id', { estimate_service_list_id }), body),

  /**
   * 견적서 서비스 목록 삭제
   */
  deleteEstimateServiceList: (estimate_service_list_id) => $http.delete(parameterToPath('/estimate_service_list/:estimate_service_list_id', { estimate_service_list_id })),


  /**
   * ==================
   *   이 미 지 테 스 트 
   * ==================
   */
  /**
   * 단일 이미지 테스트
   */
  postImageTest: (file) => $http.multipart('/user/imagetest', file),

  /**
   * 다수 이미지 테스트
   */
  postImagesTest: (file) => $http.multipart('/user/imagetests', file),
};

export default API;