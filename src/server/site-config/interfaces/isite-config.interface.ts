export interface ISiteConfig {
    id: number;
    sitename: string;
    email: string;
    headerimagefilename?: string;
    headerimage?: string;
    toppage?: string;
    footerpage?: string;
    footerimagefilename?: string;
    footerimage?: string;
    changeemailconfirm: string;
    emailconfirm: string;
    resetpassword: string;
}
