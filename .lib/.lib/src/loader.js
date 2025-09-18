import {
    /*AccessGate,
    CaptureImage, ChatPage, ClassPage, CreatePage, CreateQuiz,
    DashPage, DataPage, DocumentPage,
    ExpensePage, ExplorePage,
    HomePage,*/
    LandingPage,/*LinkCell,LoginPage,
    ManageHome,
    ProposalPage,
    ShopPage,
    RegisterBusiness, RegisterPage, ResetPage, RequestResetPage, RecorderPage,
    RoomPage,
    UploadPage,
    PastorsDeaconRegistration,
    InvoicePage,
    ListQuiz,
    ResponsesPage,
    BudgetPage,*/
} from './js/pages/index.js';
import {
    declarer,
    PageView,
    ImageCanvas
} from './js/core/index.js';
import {
    /*AccessAccordion, AddModal, AppAlert , AppBanner, AppInput, AppModal, AppNav, AppOption, AppToast, AlertWrapper,AppToggle,
    BannerModal, BinaryQuestion, 
    CardComposer, /*CardPresent,*/ // CardWrapper,
    /*DashWrapper, DatetimeInput,
    ExpenseRow,
    InvoiceTable,
    McSub, MiniCard, MiniModel,
    NumSub,
    OptInput,
    PageWrapper,
    QuestionnaireCard, QuestionTemplate,
    ShopCard,*/ SlideApp, SlideCase, SlideCloud, SlideLand,
    /*ResponseAccordion, RequirementsCard, RowModel,
    ShopImg, StepModal,
    TableBody, TableHead, TableRow, TableModel, TemplateRow, TfSub, TxtSub,
    UploadCard,
    YnSub,
    EnvElem*/
} from './js/shared/index.js';


export const pages = [
   /* AccessGate,
    BudgetPage,
    CaptureImage, ChatPage,ClassPage,CreatePage,CreateQuiz,
    DashPage, DataPage, DocumentPage,
    ExpensePage,ExplorePage,
    HomePage,
    InvoicePage,*/
    LandingPage,/*LinkCell, ListQuiz, LoginPage,
    ManageHome,
    PastorsDeaconRegistration, ProposalPage,
    ShopPage,
    RecorderPage, RegisterBusiness,RegisterPage,ResetPage, ResponsesPage, RequestResetPage, RoomPage,
    UploadPage*/
];

export const shared = [
    /* AccessAccordion,AddModal,AppAlert,AppBanner,AppInput,AppModal, AppNav, AppOption, AppToast,AppToggle,AlertWrapper,
    BannerModal, BinaryQuestion,
    CardComposer, CardWrapper,
    DashWrapper,DatetimeInput,
    EnvElem,
    ExpenseRow,
    McSub, MiniCard, MiniModel,
    NumSub,
    OptInput,
    ImageCanvas,InvoiceTable,*/
    PageView,/*PageWrapper,
    QuestionnaireCard, QuestionTemplate, 
    ShopImg, ShopCard, */
    SlideApp, SlideCase, SlideCloud ,SlideLand,
    /*ResponseAccordion, RequirementsCard,RowModel,
    TableBody,TableHead,TableRow,TableModel,TemplateRow,TfSub, TxtSub,
    StepModal,
    UploadCard,
    YnSub*/
];

export const componentRegister = component => {
    declarer(component);
}
