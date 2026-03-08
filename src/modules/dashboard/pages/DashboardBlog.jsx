import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogPosts } from "../../../store/slices/blogSlice";
import { selectBlogPosts } from "../../../store/slices/blogSlice";
import { Card, CardHeader, CardTitle, CardContent } from "../../../components/ui/card";

export default function DashboardBlog() {
  const dispatch = useDispatch();
  const posts = useSelector(selectBlogPosts);

  useEffect(() => {
    dispatch(fetchBlogPosts());
  }, [dispatch]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-emerald-900">Bloq</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {posts.map((p) => (
          <Card key={p.id} className="border-emerald-100">
            <CardHeader>
              <CardTitle className="text-lg">{p.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-emerald-700">{p.excerpt}</p>
              <p className="mt-2 text-xs text-emerald-500">{p.author}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
