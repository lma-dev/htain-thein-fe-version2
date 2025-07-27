import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { userListSchema, userSchema } from './schemas/userSchema'
import type { User } from './types'
import ToastAlert from '@/app/[locale]/_components/ui/toast-box'
import { createData, deleteSingleData, editData, exportData, fetchAllData, fetchSingleData } from '@/libs/ApiMethodHelper'

// Response types
type UserListResponse = {
    data: User[]
    meta: {
        currentPage: number
        totalPages: number
        startOffset: number
        endOffset: number
        totalItems: number
    }
}

type UserFilters = {
    role?: string
    search?: string
}

type SortOption = {
    field: string
    direction: 'asc' | 'desc'
}

// ------------------------
// ✅ LIST USERS (with pagination + filters)
// ------------------------
export const fetchUsers = async (
    page: number,
    filters: UserFilters = {},
    sort?: SortOption
): Promise<UserListResponse> => {
    const params = new URLSearchParams({ page: String(page) })

    if (filters.role && filters.role !== 'clear') {
        params.set('role', filters.role)
    }
    if (filters.search) {
        params.set('search', filters.search)
    }
    if (sort) {
        params.set('sortBy', sort.field)
        params.set('sortDir', sort.direction)
    }

    const res = await fetchAllData(`/users?${params.toString()}`)
    return {
        data: userListSchema.parse(res.data),
        meta: res.meta
    }
}

export const useUsersQuery = (
    page: number,
    filters: UserFilters = {},
    sort?: SortOption
) =>
    useQuery({
        queryKey: ['users', page, filters, sort],
        queryFn: () => fetchUsers(page, filters, sort),
        placeholderData: (prev) => prev,
        staleTime: 1000 * 60 * 5
    })

// ------------------------
// ✅ GET USER BY ID
// ------------------------
export const fetchUser = async (id: number): Promise<User> => {
    const res = await fetchSingleData(`/users/${id}`)
    return userSchema.parse(res.data)
}

export const useUserQuery = (id: number) =>
    useQuery({
        queryKey: ['user', id],
        queryFn: () => fetchUser(id),
        enabled: !!id
    })

// ------------------------
// ✅ CREATE USER
// ------------------------
export const useCreateUser = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: any) => {
            const res = await createData('/users', data)
            return res.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] })
        }
    })
}

// ------------------------
// ✅ UPDATE USER
// ------------------------
export const useUpdateUser = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: any) => {
            const { id, ...payload } = data
            const res = await editData(`/users/${id}`, payload)
            return res.data
        },
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ queryKey: ['users'] })
            queryClient.invalidateQueries({ queryKey: ['user', variables.id] })
        }
    })
}

export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id }: { id: number }) => {
            await deleteSingleData(`/users/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
        onError: () => {
            ToastAlert.error({ message: "Failed to delete user" });
        },
    });
};

export const useExportUser = () => {
    return useMutation({
        mutationFn: async ({ id }: { id: number }) => {
            const response = await exportData(`/user-report/${id}`);
            const currentDate = new Date().toISOString().replace(/:/g, ""); // Get current date and time without colons
            const filename = `${id}ReportExports_${currentDate}.xlsx`;

            const blob = new Blob([response.data]);
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = filename;
            link.click();
        },
        onSuccess: () => {
        },
        onError: () => {
            ToastAlert.error({ message: "Failed to export user" });
        },
    });
};