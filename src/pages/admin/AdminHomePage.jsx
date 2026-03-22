import { useEffect, useState } from "react";
import TopNav from "../../components/navigation/TopNav";
import styled from "styled-components";

const Shell = styled.main`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
`;

const Container = styled.div`
  width: min(1120px, calc(100% - 40px));
  margin: 0 auto;
`;

const Hero = styled.section`
  background: ${({ theme }) => theme.colors.dark};
  color: white;
  padding: 42px 0;
`;

const HeroTitle = styled.h1`
  margin: 0;
  font-size: clamp(1.9rem, 4vw, 3rem);
`;

const HeroText = styled.p`
  margin: 14px 0 0;
  color: rgba(255, 255, 255, 0.76);
  line-height: 1.7;
  max-width: 740px;
`;

const Section = styled.section`
  padding: 28px 0 70px;
`;

const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: 0 16px 34px rgba(0, 0, 0, 0.08);
  padding: 22px;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  flex-wrap: wrap;
  margin-bottom: 16px;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.35rem;
`;

const CountBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  padding: 6px 10px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.surfaceMuted};
  font-weight: 600;
`;

const Message = styled.p`
  margin: 0 0 16px;
  color: ${({ theme, $error }) => ($error ? "#b42318" : theme.colors.textMuted)};
`;

const SearchRow = styled.form`
  margin: 0 0 16px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const SearchInput = styled.input`
  flex: 1;
  min-width: 240px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  padding: 11px 12px;
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.dark};
  }
`;

const SearchButton = styled.button`
  border: 0;
  background: ${({ theme }) => theme.colors.dark};
  color: white;
  border-radius: ${({ theme }) => theme.radius.sm};
  padding: 11px 14px;
  font-weight: 600;
  cursor: pointer;
`;

const TableWrap = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const HeadCell = styled.th`
  text-align: left;
  padding: 12px 10px;
  font-size: 0.88rem;
  color: ${({ theme }) => theme.colors.textMuted};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const BodyCell = styled.td`
  padding: 13px 10px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 0.95rem;
`;

const RoleTag = styled.span`
  display: inline-block;
  padding: 6px 10px;
  border-radius: 999px;
  background: ${({ $admin }) => ($admin ? "#111111" : "#ececec")};
  color: ${({ $admin }) => ($admin ? "#ffffff" : "#222222")};
  font-size: 0.8rem;
  font-weight: 600;
`;

const DeleteButton = styled.button`
  border: 1px solid #c1121f;
  background: #ffffff;
  color: #c1121f;
  border-radius: ${({ theme }) => theme.radius.sm};
  padding: 8px 12px;
  font-weight: 600;
  cursor: pointer;

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }
`;

const StatusSelect = styled.select`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  padding: 8px 10px;
  background: #ffffff;
`;

const UpdateButton = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.dark};
  background: ${({ theme }) => theme.colors.dark};
  color: #ffffff;
  border-radius: ${({ theme }) => theme.radius.sm};
  padding: 8px 12px;
  font-weight: 600;
  cursor: pointer;

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }
`;

export default function AdminHomePage() {
  const [allUsers, setAllUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [deletingUserId, setDeletingUserId] = useState("");
  const [updatingUserId, setUpdatingUserId] = useState("");
  const [statusDrafts, setStatusDrafts] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadUsers = async () => {
      const token = localStorage.getItem("inova_token");

      if (!token) {
        setErrorMessage("Missing auth token. Please login again.");
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/users", {
          method: "GET",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const rawBody = await response.text();
        let data = null;

        try {
          data = rawBody ? JSON.parse(rawBody) : null;
        } catch {
          data = null;
        }

        if (!response.ok || data?.success === false) {
          throw new Error(data?.message || "Unable to load users.");
        }

        const fetchedUsers = Array.isArray(data?.data) ? data.data : [];
        setAllUsers(fetchedUsers);
        setUsers(fetchedUsers);
        setStatusDrafts(
          fetchedUsers.reduce((acc, user) => {
            acc[user._id] = user.status || "active";
            return acc;
          }, {})
        );
      } catch (error) {
        setErrorMessage(error.message || "Unable to load user management data.");
      } finally {
        setIsLoading(false);
      }
    };

    loadUsers();
  }, []);

  const handleSearch = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("inova_token");
    const query = searchQuery.trim();

    if (!query) {
      setUsers(allUsers);
      setErrorMessage("");
      return;
    }

    setIsSearching(true);
    setErrorMessage("");

    try {
      // Required endpoint usage: fetch user by ID when searching.
      const response = await fetch(`/api/users/${encodeURIComponent(query)}`, {
        method: "GET",
        credentials: "include",
        headers: token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {},
      });

      const rawBody = await response.text();
      let data = null;

      try {
        data = rawBody ? JSON.parse(rawBody) : null;
      } catch {
        data = null;
      }

      if (response.ok && data?.success !== false && data?.data) {
        setUsers([data.data]);
        return;
      }

      const localMatches = allUsers.filter((user) => {
        const normalized = query.toLowerCase();
        return (
          user?.name?.toLowerCase().includes(normalized) ||
          user?.email?.toLowerCase().includes(normalized)
        );
      });

      setUsers(localMatches);
      if (localMatches.length === 0) {
        setErrorMessage(data?.message || "No matching users found.");
      }
    } catch (error) {
      setErrorMessage(error.message || "Search failed.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    const token = localStorage.getItem("inova_token");
    if (!token) {
      setErrorMessage("Missing auth token. Please login again.");
      return;
    }

    setDeletingUserId(userId);
    setErrorMessage("");

    try {
      const response = await fetch(`/api/users/${encodeURIComponent(userId)}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const rawBody = await response.text();
      let data = null;
      try {
        data = rawBody ? JSON.parse(rawBody) : null;
      } catch {
        data = null;
      }

      if (!response.ok || data?.success === false) {
        throw new Error(data?.message || "Failed to delete user.");
      }

      const nextAllUsers = allUsers.filter((user) => user._id !== userId);
      const nextUsers = users.filter((user) => user._id !== userId);
      setAllUsers(nextAllUsers);
      setUsers(nextUsers);
      setStatusDrafts((prev) => {
        const next = { ...prev };
        delete next[userId];
        return next;
      });
    } catch (error) {
      setErrorMessage(error.message || "Unable to delete user.");
    } finally {
      setDeletingUserId("");
    }
  };

  const handleStatusChange = (userId, value) => {
    setStatusDrafts((prev) => ({
      ...prev,
      [userId]: value,
    }));
  };

  const handleUpdateStatus = async (userId) => {
    const token = localStorage.getItem("inova_token");
    const nextStatus = statusDrafts[userId];

    if (!token) {
      setErrorMessage("Missing auth token. Please login again.");
      return;
    }

    setUpdatingUserId(userId);
    setErrorMessage("");

    try {
      const response = await fetch(`/api/users/${encodeURIComponent(userId)}/status`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: nextStatus }),
      });

      const rawBody = await response.text();
      let data = null;
      try {
        data = rawBody ? JSON.parse(rawBody) : null;
      } catch {
        data = null;
      }

      if (!response.ok || data?.success === false) {
        throw new Error(data?.message || "Failed to update user status.");
      }

      const applyStatus = (list) =>
        list.map((user) => (user._id === userId ? { ...user, status: nextStatus } : user));

      const updatedAllUsers = applyStatus(allUsers);
      setAllUsers(updatedAllUsers);
      setUsers(updatedAllUsers);
      setSearchQuery("");
    } catch (error) {
      setErrorMessage(error.message || "Unable to update status.");
    } finally {
      setUpdatingUserId("");
    }
  };

  return (
    <Shell>
      <TopNav />

      <Hero>
        <Container>
          <HeroTitle>Admin Dashboard</HeroTitle>
          <HeroText>
            Manage platform users from this admin-only home page while keeping the same clean iNova visual theme.
          </HeroText>
        </Container>
      </Hero>

      <Section>
        <Container>
          <Card>
            <HeaderRow>
              <Title>User Management</Title>
              <CountBadge>{users.length}</CountBadge>
            </HeaderRow>

            <SearchRow onSubmit={handleSearch}>
              <SearchInput
                type="text"
                placeholder="Search by user id, name, or email"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
              <SearchButton type="submit" disabled={isSearching}>
                {isSearching ? "Searching..." : "Search"}
              </SearchButton>
            </SearchRow>

            {isLoading ? <Message>Loading users...</Message> : null}
            {!isLoading && errorMessage ? <Message $error>{errorMessage}</Message> : null}

            {!isLoading && !errorMessage ? (
              <TableWrap>
                <Table>
                  <thead>
                    <tr>
                      <HeadCell>User ID</HeadCell>
                      <HeadCell>Name</HeadCell>
                      <HeadCell>Email</HeadCell>
                      <HeadCell>Role</HeadCell>
                      <HeadCell>Status</HeadCell>
                      <HeadCell>Joined</HeadCell>
                      <HeadCell>Actions</HeadCell>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user._id}>
                        <BodyCell>{user._id || "-"}</BodyCell>
                        <BodyCell>{user.name || "-"}</BodyCell>
                        <BodyCell>{user.email || "-"}</BodyCell>
                        <BodyCell>
                          <RoleTag $admin={user.role === "admin"}>{user.role || "user"}</RoleTag>
                        </BodyCell>
                        <BodyCell>
                          <StatusSelect
                            value={statusDrafts[user._id] || user.status || "active"}
                            onChange={(event) => handleStatusChange(user._id, event.target.value)}
                          >
                            <option value="active">active</option>
                            <option value="inactive">inactive</option>
                            <option value="suspended">suspended</option>
                          </StatusSelect>
                        </BodyCell>
                        <BodyCell>
                          {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "-"}
                        </BodyCell>
                        <BodyCell>
                          <UpdateButton
                            type="button"
                            onClick={() => handleUpdateStatus(user._id)}
                            disabled={updatingUserId === user._id}
                          >
                            {updatingUserId === user._id ? "Updating..." : "Update"}
                          </UpdateButton>{" "}
                          <DeleteButton
                            type="button"
                            onClick={() => handleDeleteUser(user._id)}
                            disabled={deletingUserId === user._id || updatingUserId === user._id}
                          >
                            {deletingUserId === user._id ? "Deleting..." : "Delete"}
                          </DeleteButton>
                        </BodyCell>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </TableWrap>
            ) : null}
          </Card>
        </Container>
      </Section>
    </Shell>
  );
}
