from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import (
    Department, AlumniProfile, MentorProfile, UserSocialLink,
    UserExperience, Post, PostLike, PostComment, Job, Event,
    EventAttendee, Message, Notification, GalleryItem
)

User = get_user_model()

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'

class UserSocialLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSocialLink
        fields = ['id', 'platform', 'url']

class UserExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserExperience
        fields = '__all__'

class AlumniProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = AlumniProfile
        fields = '__all__'

class MentorProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = MentorProfile
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    department_details = DepartmentSerializer(source='department', read_only=True)
    social_links = UserSocialLinkSerializer(many=True, read_only=True)
    experiences = UserExperienceSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = [
            'id', 'email', 'first_name', 'last_name', 'role', 
            'department', 'department_details', 'batch_year', 
            'phone', 'avatar_url', 'status', 'social_links', 'experiences'
        ]
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        user = super().create(validated_data)
        if password:
            user.set_password(password)
            user.save()
        return user

class PostCommentSerializer(serializers.ModelSerializer):
    user_details = serializers.SerializerMethodField()

    class Meta:
        model = PostComment
        fields = '__all__'
    
    def get_user_details(self, obj):
        return {"id": obj.user.id, "name": f"{obj.user.first_name} {obj.user.last_name}", "avatar": obj.user.avatar_url}


class PostLikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostLike
        fields = '__all__'


class PostSerializer(serializers.ModelSerializer):
    user_details = serializers.SerializerMethodField()
    comments = PostCommentSerializer(many=True, read_only=True)
    likes_count = serializers.IntegerField(source='likes.count', read_only=True)

    class Meta:
        model = Post
        fields = '__all__'

    def get_user_details(self, obj):
        return {"id": obj.user.id, "name": f"{obj.user.first_name} {obj.user.last_name}", "avatar": obj.user.avatar_url}

class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = '__all__'

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'

class EventAttendeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventAttendee
        fields = '__all__'

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'

class GalleryItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = GalleryItem
        fields = '__all__'
