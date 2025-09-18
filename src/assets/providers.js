export const fire = {
    app: Symbol(),
    auth: Symbol(),
    db: Symbol(),
    store: Symbol(),
}

export const file = {
    upload: Symbol(),
    get: Symbol(),
    setImg: Symbol(),
    hasRequiredFiles: Symbol(),
    videoUpload: Symbol(),
}

export const tables = {files: 'uploads', profiles: 'profiles',
    tenders: 'tenders', steps:'steps',
    products: 'products',
    productImgs: 'prod-imgs',
    quiz:'questionnaires',
    responses:'responses',
    questions:'questions',
    qResponses: 'questionResponses',
    banners: 'bannerFiles',
    heros: 'heroes',
    link: 'links',
    checkin: 'check-in',
    mock: Symbol(),
}
