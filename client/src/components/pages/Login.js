import React, {useState, useEffect} from "react";
import {Button, Form, Input, Mentions, message} from "antd";
import {Link} from "@reach/router";
import "./Login.css";
import "../modules/NewTeamPostInput.css"
import "../../utilities";
import axios from 'axios';

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const getCreatorNamebyId = async (Id) => {
    await axios.get("http://localhost:8080/users/" + Id.toString())
        .then((response) => {
            return response.data.data.user.name;
        })
        .catch(err => alert(err));
}

const Login = (props) => {
    const [name, setName] = useState("");
    const [pwd, setPwd] = useState("");
    const [login, setLogin] = useState(props.logstate);
    const [email, setEmail] = useState("");
    const loginSwitch = () => {
        setLogin(true);
        alert("登录成功，点击继续！");
    }

    useEffect(() => {
        document.title = "Login";
    });

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePwdChange = (event) => {
        setPwd(event.target.value);
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        var pwdb = window.btoa(pwd);
        await axios({
            method: "post",
            url: "http://localhost:8080/login",//请求接口
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            data: {
                email: email,
                password: pwdb
            }
        }).then((res) => {
            if (res.data.msg === "") {
                console.log(res);
                global.user.Id = res.data.data;
                getCreatorNamebyId(res.data.data).then((res) => {
                        global.user.name = res;
                        props.onlogin();
                        loginSwitch();
                    }
                );

            } else
                window.alert("用户名或密码错误!");
        });

    };

    const handleLogout = (event) => {
        window.location.reload();
    };


    if (login)
        return (
            <div className="Login-container">
                <div className={"Login-container-inner"}>
                    <div className={"NewTeamPostInput"}>
                        <Form {...layout}>
                            <div className={"TeamPostFormItem"}>
                                <Form.Item>
                                    <div className="Login-logo"/>
                                </Form.Item>
                                <Form.Item>
                                    <span className="login-suscess">登录成功！</span>
                                </Form.Item><br/>
                                <Form.Item>
                                    <Button
                                        type={"button"}
                                        className="NewTeamPostInput NewPostInput-button u-pointer Login-login_button Login-logout_button"
                                        onClick={handleLogout}
                                    > 登 出 </Button>
                                </Form.Item>
                                <Form.Item>
                                    <Link to="/myacc">
                                        <Button
                                            type={"button"}
                                            className="NewTeamPostInput NewPostInput-button u-pointer Myacc_button"
                                        >去我的主页</Button>
                                    </Link>
                                </Form.Item>
                            </div>
                        </Form>
                    </div>
                </div>
                <div className="Login-status"/>
            </div>
        );
    else
        return (
            <div className="Login-container">
                <div className={"Login-container-inner"}>
                    <div className={"NewTeamPostInput"}>
                        <Form {...layout}>
                            <div className={"TeamPostFormItem"}>
                                <Form.Item>
                                    <div className="Login-logo"/>
                                </Form.Item>
                                <Form.Item>
                                    <input type="text" className="log" id="Email" name="Email"
                                           placeholder="邮箱"
                                           onChange={handleEmailChange}></input>
                                </Form.Item><br/>
                                <Form.Item>
                                    <input type="password" className="log" id="pwd" name="pwd" placeholder="密码"
                                           onChange={handlePwdChange}></input>
                                </Form.Item><br/>
                                <Form.Item>
                                    <Button
                                        type={"button"}
                                        className="NewTeamPostInput NewPostInput-button u-pointer Login-login_button"
                                        onClick={handleLogin}
                                    > 登 录 </Button>
                                </Form.Item>
                                <Form.Item>
                                    <Link to="/register" className="Login-register">
                                        还没有账户，点击此处立即注册
                                    </Link>
                                </Form.Item>
                            </div>
                        </Form>
                    </div>
                </div>
                <div className="Login-status"/>
            </div>
        );
};

export default Login;
  