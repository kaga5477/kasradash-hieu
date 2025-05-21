import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  PendingSupplier,
  useGetPendingSuppliersHook,
} from "@/hooks/useGetPendingSuppliersHook";
import {
  PendingEvent,
  useGetPendingEventsHook,
} from "@/hooks/useGetPendingEventsHook";
import {
  ReportedPost,
  useGetReportedPostsHook,
} from "@/hooks/useGetReportedPostsHook";
import ConfirmModal from "@/components/dialog/dialog";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

const AdminDashboard = () => {
  const { data: pendingSuppliers = [], loading: loadingSuppliers } =
    useGetPendingSuppliersHook();
  const { data: pendingEvents = [], loading: loadingEvents } =
    useGetPendingEventsHook();
  const { data: reportedPosts = [], loading: loadingReportedPosts } =
    useGetReportedPostsHook();
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<
    PendingSupplier | PendingEvent | ReportedPost | null
  >(null);

  const handleConfirmDialog = () => {
    console.log("Confirmed action for:", selectedItem);
    toast.success("Action confirmed!");
    setSelectedItem(null);
    setOpen(false);
  };

  const onOpenConfirmDialog = (
    item: PendingSupplier | PendingEvent | ReportedPost
  ) => {
    setOpen(true);
    setSelectedItem(item);
  };

  return (
    <>
      <Toaster richColors position="top-right" />
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-semibold">
                {pendingSuppliers.length}
              </div>
              <div className="text-sm text-muted-foreground">Submissions</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-semibold">150</div>
              <div className="text-sm text-muted-foreground">Total Users</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-semibold">24</div>
              <div className="text-sm text-muted-foreground">Active Posts</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-semibold">
                {reportedPosts.length}
              </div>
              <div className="text-sm text-muted-foreground">
                Reported Content
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pending Suppliers */}
        <div>
          <h2 className="text-lg font-medium mb-2">Pending Suppliers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {loadingSuppliers ? (
              <div>Loading...</div>
            ) : pendingSuppliers.length === 0 ? (
              <div>No pending suppliers.</div>
            ) : (
              pendingSuppliers.map((supplier: PendingSupplier) => (
                <Card key={supplier.id}>
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <div className="font-medium">{supplier.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {supplier.status}
                      </div>
                    </div>
                    <Button
                      className="border cursor-pointer hover:bg-gray-200"
                      onClick={() => onOpenConfirmDialog(supplier)}
                    >
                      Approve
                    </Button>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>

        {/* Pending Events */}
        <div>
          <h2 className="text-lg font-medium mb-2">Pending Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {loadingEvents ? (
              <div>Loading...</div>
            ) : pendingEvents.length === 0 ? (
              <div>No pending events.</div>
            ) : (
              pendingEvents.map((event: PendingEvent) => (
                <Card key={event.id}>
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <div className="font-medium">{event.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {event.date}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                      <Button
                        className="border cursor-pointer hover:bg-gray-200"
                        onClick={() => onOpenConfirmDialog(event)}
                      >
                        Approve
                      </Button>
                      <Button
                        className="border cursor-pointer hover:bg-gray-200"
                        onClick={() => onOpenConfirmDialog(event)}
                      >
                        Reject
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>

        {/* Reported Posts */}
        <div>
          <h2 className="text-lg font-medium mb-2">Reported Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {loadingReportedPosts ? (
              <div>Loading...</div>
            ) : reportedPosts.length === 0 ? (
              <div>No reported posts.</div>
            ) : (
              reportedPosts.map((post: ReportedPost) => (
                <Card key={post.id}>
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <div className="font-medium">{post.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {post.date}
                      </div>
                    </div>
                    <Button className="border cursor-pointer hover:bg-gray-200">
                      View
                    </Button>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
      <ConfirmModal
        title="Confirm?"
        description="This action cannot be undone."
        onConfirm={handleConfirmDialog}
        setOpen={setOpen}
        open={open}
      />
    </>
  );
};

export default AdminDashboard;
