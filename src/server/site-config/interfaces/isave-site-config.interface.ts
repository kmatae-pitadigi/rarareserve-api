export interface ISaveSiteConfig {
    id: number;
    sitename: string;
    email: string;
    headerimagefilename?: string;
    toppage?: string;
    footerpage?: string;
    footerimagefilename?: string;
    changeemailconfirm: string;
    emailconfirm: string;
    resetpassword: string;
}
