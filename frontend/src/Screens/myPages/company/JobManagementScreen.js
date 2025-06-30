import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import COLORS from '../../../constants/colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'axios';

const JobManagementScreen = () => {
    const navigation = useNavigation();
    const [jobs, setJobs] = useState([
        {
            id: '1',
            title: '정보보안 전문가',
            company: '시큐리티랩',
            location: '서울 강서구',
            deadline: '2025-06-27',
            career: '경력 2년 이상',
            education: '학력무관',
        },
    ]);

    const handlePress = (job) => {
        navigation.navigate('JobDetailScreen', { job });
    };

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                // const res = await axios.get('http://10.106.2.70:4000/api/jobs');
                const res = await axios.get('http://192.168.0.19:4000/api/jobs');

                setJobs(res.data);
            } catch (err) {
                console.error('채용공고 로딩 실패:', err.message);
            }
        };
        fetchJobs();
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handlePress(item)} style={styles.card}>
            <View style={styles.cardContent}>
                <View style={styles.header}>
                    <View style={styles.companyLocation}>
                        <Text style={styles.company}>{item.company}</Text>
                        <Text style={styles.location}>{item.location}</Text>
                    </View>
                </View>
                <Text style={styles.title}>{item.title}</Text>
                <View style={styles.footer}>
                    <Text style={styles.infoText}>마감: {item.deadline}</Text>
                    <Text style={styles.infoText}>{item.career}</Text>
                    <Text style={styles.infoText}>{item.education}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('AddJobScreen')}
            >
                <Text style={styles.addButtonText}>채용공고 추가하기</Text>
            </TouchableOpacity>

            <View style={{ flex: 1 }}>
                <FlatList
                    data={jobs}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingTop: 20 }}
                    ListEmptyComponent={
                        <Text style={{ marginTop: 20, fontSize: 16, color: 'gray' }}>
                            등록된 채용공고가 없습니다.
                        </Text>
                    }
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 20,
        backgroundColor: 'white',
    },
    addButton: {
        backgroundColor: COLORS.THEMECOLOR,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10,
    },
    addButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: wp('4%'),
        borderWidth: 1,
        borderColor: '#ddd',
        padding: wp('4%'),
        marginVertical: hp('0.8%'),
        shadowColor: '#aaa',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    cardContent: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: hp('0.5%'),
    },
    companyLocation: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp('2%'),
    },
    company: {
        fontSize: wp('4%'),
        color: '#333',
    },
    location: {
        fontSize: wp('3.5%'),
        color: '#666',
    },
    title: {
        fontSize: wp('4.5%'),
        fontWeight: 'bold',
        marginBottom: hp('1%'),
    },
    footer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: wp('2%'),
    },
    infoText: {
        fontSize: wp('3.5%'),
        color: '#666',
        marginRight: wp('3%'),
        marginBottom: hp('0.5%'),
    },
});

export default JobManagementScreen;
