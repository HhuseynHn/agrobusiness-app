import { Component } from "react";
import { Button } from "./ui/button";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    if (typeof this.props.onError === "function") {
      this.props.onError(error, errorInfo);
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-50 px-4">
          <h1 className="text-xl font-semibold text-gray-900">Xəta baş verdi</h1>
          <p className="max-w-md text-center text-sm text-gray-600">
            Tətbiqdə gözlənilməz xəta yarandı. Zəhmət olmasa səhifəni yeniləyin və ya ana səhifəyə qayıdın.
          </p>
          <div className="flex gap-2">
            <Button onClick={this.handleRetry}>Yenidən cəhd et</Button>
            <Button variant="outline" onClick={() => (window.location.href = "/")}>
              Ana səhifə
            </Button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
