<template>
<div class="section-padding-top section-padding-bottom-180">
    <div class="container">
        <div class="row">
            <!-- data-aos="fade-up" -->
            <div class="col-xl-5 col-lg-6 col-12" >
                <h3 class="title">{{ translate("corp_info") }}</h3>
                <div>
                    <table >
                        <tbody>
                            <tr>
                                <th>{{ $t('corp_info_name_label') }}</th>
                                <td>{{ $t('corp_info_name') }}</td>
                            </tr>
                            <tr>
                                <th>{{ $t('corp_info_est_label') }}</th>
                                <td>{{ $t('corp_info_est_date') }}</td>
                            </tr>
                            <tr>
                                <th>{{ $t('corp_info_representative_label') }}</th>
                                <td>{{ $t('corp_info_representative') }}</td>
                            </tr>
                            <tr>
                                <th>{{ $t('corp_info_address_label') }} </th>
                                <td>{{ $t('corp_info_address') }}</td>
                            </tr>
                            <tr>
                                <th>{{ $t('corp_info_tel_label') }}</th>
                                <td>{{ $t('corp_info_tel') }}</td>
                            </tr>
                            <tr>
                                <th>{{ $t('corp_info_capital_label') }}</th>
                                <td>{{ $t('corp_info_capital') }}</td>
                            </tr>
                              <tr>
                             <th>{{ $t('corp_info_functions_label') }}</th>
                            <td>
                                {{ $t('corp_info_function1') }}<br>
                                {{ $t('corp_info_function2') }}<br>
                                {{ $t('corp_info_function3') }}<br>
                                {{ $t('corp_info_function4') }}<br>
                                {{ $t('corp_info_function5') }}<br>
                                {{ $t('corp_info_function6') }}<br>
                                {{ $t('corp_info_function7') }}<br>
                                {{ $t('corp_info_function8') }}<br>
                                {{ $t('corp_info_function9') }}<br>
                            </td>
</tr>
                            <tr>
                                <th>{{ $t('corp_info_clients_label') }}</th>
                                <td> {{ $t('corp_info_clients') }} </td>
                            </tr>
                            <!--
                            <tr>
                                <th>{{ $t('corp_info_bank_label') }}</th>
                                <td>{{ $t('corp_info_bank') }} </td>
                            </tr>
                            -->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    components: {
        ShapeWithAnimation: () => import('@/components/ShapeWithAnimation')
    },
    methods: {
        translate: function (str) {
            //console.log(" translate: " + str)
            return this.$t(str)
        },
    },
    data() {
        return {};
    }

}
</script>
