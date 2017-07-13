import React, { Component } from 'react';
import TodoInput from './todoinput';
import UserDialog from './UserDialog';
import {getCurrentUser,signOut} from './leanCloud';
import logo from './img/retina.svg';

class Tabstoggle extends Component{
    constructor(props){
        super(props);
        this.state={
            add:'false',
            user: getCurrentUser() ||{},
            currentIndex:0,
        }
    }
    render(){
        let classinpt=(
            <input type="text" placeholder="Add ListClass" className="classipt" onKeyPress={this.leftsubmit.bind(this)}/>
        )
        let addtip=(
            <div className="add">+</div>
        )
        return (
            <div>
                <h3>{this.state.user.username  ||'My'} To Do List
                    {this.state.user.id ? <button className="loginout" onClick={this.signOut.bind(this)}>退出登录</button> : null}
                </h3>
                <section >
                    <nav  className="left">
                        <div className="createnoteclass">
                            <img src={logo} className="menu"/>
                            
                            <span className="tips">(4/4 messages)</span>
                            <div className="triangle"></div>
                        </div>
                        <ul>
                            {React.Children.map(this.props.children,
                                (element,index)=>(
                                    <li className={this.addTitleClass(index)}
                                    onClick={this.changeTab.bind(this,index)}>
                                        {element.props.name}
                                    </li>
                                )
                            )}
                        </ul>
                        <div className="addlistclass" onClick={this.submit.bind(this)}>
                            {this.state.add === 'true'?classinpt:addtip}
                        </div>
                    </nav>
                    <div>
                        {React.Children.map(this.props.children,
                        (element,index)=>(
                            <div className={this.addPanelClass(index)}>
                                <TodoInput onSubmit={this.addTodo.bind(this)} 
                                content={this.props.pressvalue}
                                onChange={this.changeTitle.bind(this)}/>
                                <ul>
                                    {/*<li className="list-normal">
                                        {element}
                                    </li>*/}
                                    {element}
                                </ul>
                            </div>
                            )
                        )}
                        <div className="addlist">
                            <div className="add_"></div>Add List
                        </div>
                    </div>
                </section>
                {this.state.user.id ? null : <UserDialog onSignUp={this.onSignUpSignIn.bind(this)} onSignIn={this.onSignUpSignIn.bind(this)}/>}
            </div>
            
        )   
    }
    changeTab(index){
        this.setState({
            currentIndex: index
        })
    }
    addTitleClass(index){
        return index==this.state.currentIndex?'noteclass active':'noteclass';
    }
    addPanelClass(index){
        return index==this.state.currentIndex?'right hover':'right';
    }
    addInputClass(index){
        return index==this.state.currentIndex?'note-item hover':'note-item';
    }
    /*获取当前注册或登陆用户信息的*/
    onSignUpSignIn(user){
        let stateCopy = JSON.parse(JSON.stringify(this.state)) 
        stateCopy.user = user
        this.setState(stateCopy)
    }
    signOut(){
        signOut()
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.user = {}
        this.setState(stateCopy)
    }
    submit(e){
        this.setState({
            add:'true'
        })
    }
    leftsubmit(e){
        // e.preventDefault()
        // alert(111222)
        if(e.key === 'Enter'){
            this.props.addleft(e)
            this.setState({
                add:'false'
            })
        }
        
    }
    addTodo(e){
        this.props.addlists(e)
    }
    changeTitle(e){
        this.props.changevalue(e)
    }
}

export default Tabstoggle;