import { TagsOutlined,  } from '@ant-design/icons';
export interface AdminType {
    content: string
    path: string
    icon: JSX.Element
}
const admin:AdminType[] = [
    {
        content: "Product",
        path: "/admin-layout",
        icon: <TagsOutlined style={{ fontSize: "16px" }} />,
    },
    {
        content: "Contract",
        path: "/admin-layout/contract",
        icon: <TagsOutlined style={{ fontSize: "16px" }} />,
    }
];

export default admin;
