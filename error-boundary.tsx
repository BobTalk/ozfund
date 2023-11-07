import React from "react";

class ErrorBoundary extends React.Component<any,any> {
  constructor(props: any) {
    super(props);
    this.state = {
      error: false,
      contentHeight: window.innerHeight
    };
  }

  static getDerivedStateFromError(error: any) {
    return { error: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error(error, errorInfo);
  }

  render() {
    if(this.state.error){
      return <>页面加载出错</>
    }
    return this.props.children
  }
}
export default ErrorBoundary;
