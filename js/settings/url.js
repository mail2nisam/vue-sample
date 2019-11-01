export default {
    login: `${document.location.origin}/auth/login`,
    logout: `${document.location.origin}/auth/logout`,
    register: `${document.location.origin}/auth/register`,
    verify: `${document.location.origin}/auth/verify`,
    forget_password: `${document.location.origin}/auth/forgot-password`,
    token_verify: `${document.location.origin}/auth/check-token`,
    reset_password: `${document.location.origin}/auth/reset-password`,
    get_user: `${document.location.origin}/api/user`,
    get_topics: `${document.location.origin}/api/topics`,
    get_abstracts: `${document.location.origin}/api/abstract/list-all`,
    get_abstract: `${document.location.origin}/api/abstract/`, //{id}
    request_abstract_edit: `${document.location.origin}/api/abstract/`, //{id}/edit-request
    post_form_create: `${document.location.origin}/api/abstract/create`,
    post_form_update: `${document.location.origin}/api/abstract/update`,
    post_abstract_people: `${document.location.origin}/api/abstract/`,//{id}/add/people
    companies_api: `${document.location.origin}/api/company-names`,
    delete_abstract: `${document.location.origin}/api/abstract/`,//{id}/delete
    get_user_email: `${document.location.origin}/api/user/by/email/`,//{$email}
    post_profile: `${document.location.origin}/api/user/edit`,
    post_abstract_final_submit: `${document.location.origin}/api/abstract/final/submit`,


    //===================================ADMIN========================================//
    get_admin_abstracts: `${document.location.origin}/api/admin/fetch-all/abstracts`,
    get_admin_abstract: `${document.location.origin}/api/admin/abstract/`, //{id}
    post_change_abstract_status: `${document.location.origin}/api/admin/abstract/handle/edit-request`,
    post_admin_form_update: `${document.location.origin}/api/admin/abstract/update`, // update abstract by admin
    post_admin_form_create: `${document.location.origin}/api/admin/abstract/update`, // todo
    post_admin_abstract_people: `${document.location.origin}/api/admin/abstract/`,//{id}/add/people
    post_admin_export_table: `${document.location.origin}/api/admin/export/excel`, // export table data
    delete_admin_abstract: `${document.location.origin}/api/admin/abstract/`,//{id}/delete

    // report APIs
    get_chart_country: `${document.location.origin}/api/admin/reports/country`,
    get_chart_company: `${document.location.origin}/api/admin/reports/company`,
    get_chart_abstract_status: `${document.location.origin}/api/admin/reports/abstracts/count`,
    get_chart_abstract_stream_count: `${document.location.origin}/api/admin/reports/abstracts/stream/count`,
    get_chart_topic: `${document.location.origin}/api/admin/reports/abstracts/topics/count`,
    get_chart_technical: `${document.location.origin}/api/admin/reports/abstracts/technical/count`,
    get_chart_strategic: `${document.location.origin}/api/admin/reports/abstracts/strategic/count`,
}
