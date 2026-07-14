import { axiosClient } from '../http/axios-client';
import type { LoggedUser } from '@/domain/entities/logged-user.entity';
import type { UserProfile } from '@/domain/entities/user-profile.entity';
import type { UpdateProfileDto } from '@/application/dtos/update-profile.dto';

export class AxiosUserRepository {
  async getUsers(): Promise<LoggedUser[]> {
    const { data } = await axiosClient.get<any>('/users/');
    return data.results ? data.results : data;
  }

  async getUserById(id: string): Promise<LoggedUser> {
    const { data } = await axiosClient.get<LoggedUser>(`/users/${id}/`);
    return data;
  }

  async updateUser(id: string, userData: Partial<LoggedUser>): Promise<LoggedUser> {
    const { data } = await axiosClient.patch<LoggedUser>(`/users/${id}/`, userData);
    return data;
  }

  async deleteUser(id: string): Promise<void> {
    await axiosClient.delete(`/users/${id}/`);
  }

  async getProfile(): Promise<UserProfile> {
    const { data } = await axiosClient.get<UserProfile>('/users/me/');
    return data;
  }

  async updateProfile(dto: UpdateProfileDto): Promise<UserProfile> {
    const { data } = await axiosClient.patch<UserProfile>('/users/me/', dto);
    return data;
  }

  async uploadAvatar(file: File): Promise<{ avatarUrl: string }> {
    const formData = new FormData();
    formData.append('foto_perfil', file);
    const { data } = await axiosClient.patch<{ avatarUrl: string }>('/users/me/avatar/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  }
}

export const userRepository = new AxiosUserRepository();