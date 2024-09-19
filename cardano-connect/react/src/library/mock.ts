import {filterPaginatedRange} from "./utils";

export const mockOption: AjaxResponse<Options> = {
    nonce: 'nonce_value',
    success: true,
    message: 'Success',
    data: {
        label_connect: 'Cardano Connect',
        label_connect_cancel: 'Cancel',
        label_connected: 'Connected',
        label_create_mainnet_prompt: 'You are logged in but do not have a Mainnet wallet connected to your account.' +
            ' Please connect now to link your Mainnet account.',
        label_create_testnet_prompt: 'You are logged in but do not have a Tesnet wallet connected to your account.' +
            ' Please connect now to link your Testnet account.',
        label_disconnect: 'Disconnect',
        label_disconnect_prompt: 'Are you sure you would like to disconnect?',
        label_empty: 'No wallets detected. Please install a Wallet browser extension or switch browsers.',
        label_error: 'Unable to sign authentication',
        label_invalid_account: 'Invalid account, please switch to the wallet you originally connected with.',
        label_switch_to_testnet: 'Mainnet connection is currently disabled, please switch to testnet to connect.',
        label_welcome_back: 'Welcome back',
        label_welcome_new: 'Thanks for connecting',
        label_paginate_prev: 'Prev',
        label_paginate_next: 'Next',
        label_paginate_items: 'Items',
        label_assets_policy_label: 'Token Collection',
        label_assets_quantity_label: 'Qty',
        label_no_assets: 'No assets found',
        label_text_copied: 'Copied!',
        label_text_copied_failed: 'Copy failed',
        login_redirect: '/wallet',
        logout_redirect: null,
        mainnet_active: true,
        disable_styles: false,
        plugin_name: 'cardano-connect',
        version: '0.1.0',
        assets_whitelist: null,
        assets_api_endpoint: 'https://cardano-mainnet.blockfrost.io/api/v0/',
        assets_api_key: 'xxx',
        assets_ipfs_endpoint: 'https://ipfs.io/ipfs/',
        assets_placeholder: 'https://upstream.org.uk/wp-content/plugins/cardano-connect/assets/logo-dark.svg'
    }
}

export const mockUser: AjaxResponse<{ user: User|null; web3: UserWeb3|null }> = {
    nonce: 'nonce_value',
    success: true,
    message: '',
    data: {
        user: {
            data: {
                ID: '2',
                user_login: 'tester',
                user_pass: 'tester',
                user_nicename: 'tester',
                user_email: 'tester@pendulumdev.co.uk',
                user_url: '',
                user_registered: '2023-09-26 13:56:40',
                user_activation_key: '',
                user_status: '0',
                display_name: 'tester'
            },
            ID: 2,
            caps: {
                administrator: true
            },
            cap_key: 'wp_capabilities',
            roles: [
                'administrator'
            ],
            filter: null
        },
        web3: {
            cardano_connect_network: 'testnet',
            cardano_connect_address: 'addr1qxszal5f5mm62ppxccd6kkjvf5k5l8ljw7audlnark96fw38kyycd8mpe47gdy6rcxcxh8krxke7v7lnd9crjfwjtqtszy6cnn',
            cardano_connect_stake_address: 'stake1uynmzzvxnasu6lyxjdpurvrtnmpntvlx00ekjupeyhf9s9cld72hf',
            cardano_connect_wallet: 'eternl',
            cardano_connect_address_testnet: 'addr_test1qrt7n958gtzy4cvsuarsu6gr058tj9s64zahd3ezrkq7f20zvgd6cz0xh86sq70jvk7z56zztgpfnt9v85zryhag9lcq2p9ezh',
            cardano_connect_stake_address_testnet: 'stake_test1ur3xyxavp8ntnagq08ext0p2dpp95q5e4jkr6ppjt75zluq9706vn'
        }
    },
}

export const mockUserUnauthenticated: AjaxResponse<{ user: User|null; web3: UserWeb3|null }> = {
    nonce: 'nonce_value',
    success: true,
    message: '',
    data: {
        user: null,
        web3: null
    },
}

export const mockApiAsset: AjaxResponse<ApiAsset> = {
    nonce: 'nonce_value',
    success: true,
    message: '',
    data: {
        asset: "c48699aa28e497a277c5271b7dff2e747e40e6d6dc46dc2ca963cc32557073747265616d4576656e745061737330303031",
        asset_name: "557073747265616d4576656e745061737330303031",
        fingerprint: "asset1cmeen64ysswcf2tckjhj6w2helpc20f5xfr9xz",
        initial_mint_tx_hash: "2a2b6363b545ae8634793201d688a5c1a55af5f924e6850265cabc9148af0fa1",
        metadata: null,
        mint_or_burn_count: 1,
        onchain_metadata: {
            Publisher: "https://upstream.org.uk",
            Rarity: "Bear",
            Type: "Torrent",
            description: "Ongoing access to Upstream and partnered events and unlockables",
            files: [{
                src: "ipfs://QmdanSQgrSHS1vsUen9tYk168rS12P3mMKh3yhPgQ4LJ2T",
                mediaType: "image/gif",
                name: 'Image 1'
            }],
            ArrDescription: [
                "Moneda's radiant presence illuminates the surrounding expanse",
                "of red and black, her purpose transcending the mere",
                "illumination as she imparts the virtues of",
                "profound wisdom and patience"
            ],
            image: "ipfs://QmdanSQgrSHS1vsUen9tYk168rS12P3mMKh3yhPgQ4LJ2T",
            mediaType: "image/gif",
            name: "Upstream Event Pass 0001",
        },
        onchain_metadata_extra: null,
        onchain_metadata_standard: "CIP25v1",
        policy_id: "c48699aa28e497a277c5271b7dff2e747e40e6d6dc46dc2ca963cc32",
        quantity: "1",
        walletAsset: {
            policyId: "c48699aa28e497a277c5271b7dff2e747e40e6d6dc46dc2ca963cc32",
            assetName: '',
            quantity: '1',
            fingerprint: '',
            unit: '',
        }
    }
}

const poolMockData: ({pool_id: string} & PoolData)[]  = [
    {
        "pool_id": "pool1keasvddt9vndl8jyhg204s6kqusv5zgzg3kk3l3g949ew402ahe",
        "data": {
            "pool_id": "pool1keasvddt9vndl8jyhg204s6kqusv5zgzg3kk3l3g949ew402ahe",
            "hex": "b67b0635ab2b26df9e44ba14fac3560720ca0902446d68fe282d4b97",
            "vrf_key": "b92a6feb83931b5d788df0a7b0941e44461702de79b51cf6021f49d3b3d10bb8",
            "blocks_minted": 387,
            "blocks_epoch": 0,
            "live_stake": "101179221009",
            "live_size": 4.471068063056371e-6,
            "live_saturation": 0.0013590838748575842,
            "live_delegators": 59,
            "active_stake": "101179221009",
            "active_size": 4.479184675159492e-6,
            "declared_pledge": "12440000000",
            "live_pledge": "13936196125",
            "margin_cost": 0.01,
            "fixed_cost": "170000000",
            "reward_account": "stake1u8ukz0ml5f98sffj55jhtqgxr3uvvuehlaynsdwyvwvskagk5wf3j",
            "owners": [
                "stake1u8ukz0ml5f98sffj55jhtqgxr3uvvuehlaynsdwyvwvskagk5wf3j"
            ],
            "registration": [
                "74850b7b42683e0d11234dfb1ae4e9b8bf106acc4a6c2894e3df2e0343afd202",
                "ed70032d0bb717603aa7b26d97031548a6ba1a7ff4e5832f818ba75d2de28676",
                "e0ab242c767af31ad37cd6c72926850d4d28b0f6af9a36301c50e33be2305663",
                "e87aab645463e642c2d0b48bdaf6b7799415228901fd572a59a47c732b75c5c8",
                "80a8e74eb8ce43d7e7101e2f2521b6f24fd0302526a9d4e15fd9157390878963",
                "dc3e9c3f2f9b382dff88434633c5f53377d34618637b3d4d7e6579096927e3cd",
                "5425091203a6217012f57d67621ba1ac39babb8407eaaa4d619bf938fa728443",
                "0bb1ecbf7bc3fa854a3ab2eeba0b550c23cbbac6ebaacb1fdef0c96020f64dcb"
            ],
            "retirement": []
        },
        "metadata": {
            "pool_id": "pool1keasvddt9vndl8jyhg204s6kqusv5zgzg3kk3l3g949ew402ahe",
            "hex": "b67b0635ab2b26df9e44ba14fac3560720ca0902446d68fe282d4b97",
            "url": "https://upstream.org.uk/assets/poolMetaData.json",
            "hash": "a0091fbf52d709447231d7124069bcae3e055268afdf5a26a6d5f1b8bacb298c",
            "ticker": "UPSTR",
            "name": "Upstream",
            "description": "Upstream is an independent ADA Stake Pool Operator. Hosts of the London Cardano Social and the 2022\/2023 Cardano Summits, we provide community driven events and educational content. Actively supporting decentralisation, sustainability and SPO alliances.",
            "homepage": "https://upstream.org.uk"
        },
        "metadata_file": {
            "name": "Upstream",
            "description": "Upstream is an independent ADA Stake Pool Operator. Hosts of the London Cardano Social and the 2022\/2023 Cardano Summits, we provide community driven events and educational content. Actively supporting decentralisation, sustainability and SPO alliances.",
            "ticker": "UPSTR",
            "homepage": "https://upstream.org.uk",
            "extended": "https://upstream.org.uk/assets/extendedPoolMetaData.json"
        },
        "metadata_file_extended": {
            "info": {
                "url_png_icon_64x64": "https://upstream.org.uk/assets/icon.png",
                "url_png_logo": "https://upstream.org.uk/assets/logo.png",
                "location": "Kent, England",
                "social": {
                    "twitter_handle": "Upstream_ada",
                    "telegram_handle": "Upstream_ada",
                    "facebook_handle": "upstream",
                    "youtube_handle": "Upstream_ada",
                    "twitch_handle": "Upstream_ada",
                    "discord_handle": "Upstream_ada",
                    "github_handle": "Upstream_ada"
                },
                "about": {
                    "me": "We are a team formed from long term friends, coming together on Cardano through our passion for a decentralised and sustainable future. We aim to highlight the positive uses of blockchain technology to new users and expand the Cardano community.",
                    "server": "100% sourced Green Power, hosted in London, UK",
                    "company": "Upstream (UPSTR) is an independent, fast growing, ADA Stake Pool Operator. As hosts of the London Cardano Social and the 2022/2023 Cardano Summits, we provide community driven events and educational content. Actively supporting decentralisation, sustainability and SPO alliances."
                }
            },
        }
    },
    {
        "pool_id": "pool1z5uqdk7dzdxaae5633fqfcu2eqzy3a3rgtuvy087fdld7yws0xt",
        "data": {
            "pool_id": "pool1z5uqdk7dzdxaae5633fqfcu2eqzy3a3rgtuvy087fdld7yws0xt",
            "hex": "153806dbcd134ddee69a8c5204e38ac80448f62342f8c23cfe4b7edf",
            "vrf_key": "0220a5d08adbfe9554b52d7b2993be5892ac3ff340e674a377dea3e22ad1778b",
            "blocks_minted": 14545,
            "blocks_epoch": 33,
            "live_stake": "70973162298063",
            "live_size": 0.00313623419317482,
            "live_saturation": 0.9533427858509366,
            "live_delegators": 5590,
            "active_stake": "70548577729537",
            "active_size": 0.0031231719820449277,
            "declared_pledge": "400000000000",
            "live_pledge": "503127621046",
            "margin_cost": 0.009,
            "fixed_cost": "340000000",
            "reward_account": "stake1uy89kzrdlpaz5rzu8x95r4qnlpqhd3f8mf09edjp73vcs3qhktrtm",
            "owners": [
                "stake1uy89kzrdlpaz5rzu8x95r4qnlpqhd3f8mf09edjp73vcs3qhktrtm"
            ],
            "registration": [
                "841cca81da918feb9fa7257a34630eac95794be712ed3faae6df64f215ce25f2",
                "f7c57295fda5181dd0d3ef44b0f35c6c36befdcbeec5a69f16f3ebca56b2f465",
                "2dd4736901077109ee576b72074266316d3b92159d66f751757e3df9954f59d5",
                "2e5c52c6c51ecd42b67e3f50283084741c1a5eceb2c259c60b7958c5b8f4b59b",
                "8ff55947fa5149f9e63cc0f83d40a552085a1ec5f0d60f4f16723e3c16106431",
                "1c946afd3e420b9ae9193c2eb8d83c4efa3b99e47947e4aa704608633e100f4b",
                "5425783c08f95d16995676eeb4bc5c029add137f403936eaec72d0caa4080471",
                "f87a5497aa10de6492734f52169616e84887fab081a0da354c5b07a8e0835f81",
                "c97c539d503f5b2f4475cf70aa614cc3255435f82e15f1a99735ae039d9389be"
            ],
            "retirement": []
        },
        "metadata": {
            "pool_id": "pool1z5uqdk7dzdxaae5633fqfcu2eqzy3a3rgtuvy087fdld7yws0xt",
            "hex": "153806dbcd134ddee69a8c5204e38ac80448f62342f8c23cfe4b7edf",
            "url": "https://raw.githubusercontent.com/Octalus/cardano/master/p.json",
            "hash": "ca7d12decf886e31f5226b5946c62edc81a7e40af95ce7cd6465122e309d5626",
            "ticker": "OCTAS",
            "name": "OctasPool",
            "description": "Octa's Performance Pool",
            "homepage": "https://octaluso.dyndns.org"
        }
    },
    {
        "pool_id": "pool1pu5jlj4q9w9jlxeu370a3c9myx47md5j5m2str0naunn2q3lkdy",
        "data": {
            "pool_id": "pool1pu5jlj4q9w9jlxeu370a3c9myx47md5j5m2str0naunn2q3lkdy",
            "hex": "0f292fcaa02b8b2f9b3c8f9fd8e0bb21abedb692a6d5058df3ef2735",
            "vrf_key": "b512cc7c1a8ba689c2d8fd27adfdbac2049a3f8f95c8b85e8298f14d7d8dc4e6",
            "blocks_minted": 2889,
            "blocks_epoch": 3,
            "live_stake": "7017620971293",
            "live_size": 0.0003101017642764731,
            "live_saturation": 0.09426377676003614,
            "live_delegators": 179,
            "active_stake": "7009415751185",
            "active_size": 0.000310305488631274,
            "declared_pledge": "250000000000",
            "live_pledge": "305033463163",
            "margin_cost": 0.049,
            "fixed_cost": "340000000",
            "reward_account": "stake1u98nnlkvkk23vtvf9273uq7cph5ww6u2yq2389psuqet90sv4xv9v",
            "owners": [
                "stake1u98nnlkvkk23vtvf9273uq7cph5ww6u2yq2389psuqet90sv4xv9v"
            ],
            "registration": [
                "a96c79773b7506211eb56bf94886a2face17657d1009f52fb5ea05f19cc8823e",
                "68b302b1a31a47a4688320635c77440f6d5c2845484f1751ac19eb4f361416c6"
            ],
            "retirement": []
        },
        "metadata": {
            "pool_id": "pool1pu5jlj4q9w9jlxeu370a3c9myx47md5j5m2str0naunn2q3lkdy",
            "hex": "0f292fcaa02b8b2f9b3c8f9fd8e0bb21abedb692a6d5058df3ef2735",
            "url": "https://stakenuts.com/mainnet.json",
            "hash": "47c0c68cb57f4a5b4a87bad896fc274678e7aea98e200fa14a1cb40c0cab1d8c",
            "ticker": "NUTS",
            "name": "StakeNuts",
            "description": "StakeNuts.com",
            "homepage": "https://stakenuts.com/"
        }
    },
    {
        "pool_id": "pool1q80jjs53w0fx836n8g38gtdwr8ck5zre3da90peuxn84sj3cu0r",
        "data": {
            "pool_id": "pool1q80jjs53w0fx836n8g38gtdwr8ck5zre3da90peuxn84sj3cu0r",
            "hex": "01df29429173d263c7533a22742dae19f16a08798b7a57873c34cf58",
            "vrf_key": "b75115a1e4e32a33985fc720f3715f0e99617b448fbc36867deb5c9eaa59e2ff",
            "blocks_minted": 2398,
            "blocks_epoch": 2,
            "live_stake": "6939010813032",
            "live_size": 0.0003066280587477036,
            "live_saturation": 0.09320785047964875,
            "live_delegators": 1127,
            "active_stake": "7035955846014",
            "active_size": 0.00031148041353037714,
            "declared_pledge": "200000000000",
            "live_pledge": "201203496497",
            "margin_cost": 0.02,
            "fixed_cost": "170000000",
            "reward_account": "stake1uxxsa2rlkv728pve3ks7kn7c6v68luagdjgwa0medy6vp9suv96q8",
            "owners": [
                "stake1uxxsa2rlkv728pve3ks7kn7c6v68luagdjgwa0medy6vp9suv96q8"
            ],
            "registration": [
                "e8951eddb19b697bc74549aa9d4f956a8be8d5cf2c7a8e13878b8e785b1b0499",
                "825ef903fa05a561ce85e0d63018dc7eedbc78fa6e4a19cc73aa797a2e48d618",
                "0182015942b0ca2ab98abd22d2fb0e12eb36622bd9e2457820055d0f5a2e92e1",
                "24fe5f9688387a54ed806ff0d7cd31e4ae43abc27bafc4fe525db1c8be6d4ca3",
                "86ec5b07df13dd002770a64f47c461dac1f722e58df22f47d10af79eefd5eaae",
                "baea25fd856a7a7d000a539b630bf40fbe52ac1469cbfdfc9ac18f8654bdeea4",
                "7d13c2aefc34779318071b8b5fe5353d2c67fed3629673ce891151569d4331d6",
                "57dc64b802e29feff442906094cd040d4e3e79a13e3241d36952282e2291cabc",
                "885f478d360601916fa86bf70e499a0ffdb88670d691b50ccba5686abed10c29",
                "39be68928de286767d442e2a4bb91ff0f580ba5ab7aafdc3f6e7e77e9e1339dd",
                "282fceae603d032793ece6e656f417bc6d0bfe7398baaa890192df7b8e54f955",
                "ba121c5afd5793160e6b108eb873d1260b07fb5865afd7a4c53d61cf2f008534",
                "f8ab180ad4e2cf88e5eb7f97dc90f88d80b0eae4f2f7ecc7ae91bfbcf047cd1d",
                "0f44f4dd478761e85b12dcd2681851aac3cc54365217705796df73e59c9582cf",
                "2a08cb691f84723aafbc8c8f5f72c119aebb27ea8f41d14e973bf4a5c3a6bf10",
                "82784db28be605d42ff7513e13f672f322abbb718f25a0eb69ae350babc8c5b9",
                "9bd097560448517f202e2472d30457fef175afef69926219bf76a928cd5a301b",
                "f90eb02426db6cf591f4658fe7207328513c5849840b1cd47fdfaf0c173c8c25",
                "5c6eef9c485c44e75121faca2ad349b199044c25dd3ba76276c68bbcd8eb9d2f",
                "9955ac3136c0d58a1d96b176b2880556fd94ee36954c983ac8abb4a7e7249985",
                "ae42e493171ddb251d2aa242c69ce81fefaade2ba942be2564e4a690414513f0",
                "1b382657bf8179d2c550352fc144353eb7a77ee957e389d3123c668b1dd62d46",
                "2abc7aa465299f39d2f5e7771b17aadb8a94048cf4b7a2b4833d53e3e7e1b988",
                "e88236766068b643198c0590cf687133a9d1d30d5428e01071523e5caa3843a4",
                "cabd51c79c5474b4776ef4e3468dde89533fb962637c50b7877182ba7a3e9ce6",
                "5fde1a772e7365ebf0446dcde67994ae2ed2e77d6fdeb228cd893d058bc1f9bb"
            ],
            "retirement": []
        },
        "metadata": {
            "pool_id": "pool1q80jjs53w0fx836n8g38gtdwr8ck5zre3da90peuxn84sj3cu0r",
            "hex": "01df29429173d263c7533a22742dae19f16a08798b7a57873c34cf58",
            "url": "https://ispool.live/metadata",
            "hash": "34fdde237812fab14d29a80423bb295f39122f4fea1aae31b902bf85ac927b5e",
            "ticker": "000",
            "name": "Switzerland Investment",
            "description": "Stability, Security, Reliability, Neutrality! Stake pool server is located in our own mini data center in Switzerland with nodes in Europe.",
            "homepage": "https://ispool.live/"
        }
    },
    {
        "pool_id": "pool1ddskftmsscw92d7vnj89pldwx5feegkgcmamgt5t0e4lkd7mdp8",
        "data": {
            "pool_id": "pool1ddskftmsscw92d7vnj89pldwx5feegkgcmamgt5t0e4lkd7mdp8",
            "hex": "6b6164af70861c5537cc9c8e50fdae35139ca2c8c6fbb42e8b7e6bfb",
            "vrf_key": "78b0b08fec7458afd1209dcd26bd0c10faa640a49d50137200f1656af56a4f1d",
            "blocks_minted": 23,
            "blocks_epoch": 0,
            "live_stake": "2671108363",
            "live_size": 1.1803364976939247e-7,
            "live_saturation": 3.5879504387838916e-5,
            "live_delegators": 13,
            "active_stake": "2671108363",
            "active_size": 1.1824945404724663e-7,
            "declared_pledge": "7149000000",
            "live_pledge": "0",
            "margin_cost": 0.05,
            "fixed_cost": "340000000",
            "reward_account": "stake1u9w20uzsevkxe6vp2nlmqjjrcj4gvcf560tvufuvrcjpxvgqaqg0t",
            "owners": [
                "stake1u9w20uzsevkxe6vp2nlmqjjrcj4gvcf560tvufuvrcjpxvgqaqg0t"
            ],
            "registration": [
                "ff2d9576bd9c5e1dff6c9987860de39366f7b75dd6bbc88115811d3c60782b40",
                "3173116cf1d4b2a164886706856d067c9795861ba8a43300b9150d5e0bb0f026",
                "0e57b977f762ff907a026f7c13fb6ceb28266e5fa3c0c9dfe76e780df7b44006",
                "7824f2bd413905fd47a1cdbb941475cabffbd5ab72701a33e725fd4f4a2b81f0",
                "e38a6a3197461750f9509d40f13d2208087312802d580fbbbb096d9e5151d7d2"
            ],
            "retirement": []
        },
        "metadata": {
            "pool_id": "pool1ddskftmsscw92d7vnj89pldwx5feegkgcmamgt5t0e4lkd7mdp8",
            "hex": "6b6164af70861c5537cc9c8e50fdae35139ca2c8c6fbb42e8b7e6bfb",
            "url": "https://pool.adascan.net/meta/v1/poolmeta.json",
            "hash": "79e7cf8d936bf0ced040516b288e2edc76f2f87af5400f92010a682de3a052e9",
            "ticker": null,
            "name": null,
            "description": null,
            "homepage": null
        }
    },
    {
        "pool_id": "pool1qqqqqdk4zhsjuxxd8jyvwncf5eucfskz0xjjj64fdmlgj735lr9",
        "data": {
            "pool_id": "pool1qqqqqdk4zhsjuxxd8jyvwncf5eucfskz0xjjj64fdmlgj735lr9",
            "hex": "00000036d515e12e18cd3c88c74f09a67984c2c279a5296aa96efe89",
            "vrf_key": "6de7605b2afd7e205318fc8b4329d26439b5b179b4746fea12f1ce50395f5d9e",
            "blocks_minted": 17926,
            "blocks_epoch": 18,
            "live_stake": "66538711937481",
            "live_size": 0.002940280195938695,
            "live_saturation": 0.8937772948457497,
            "live_delegators": 2915,
            "active_stake": "67501811866170",
            "active_size": 0.0029882922426290783,
            "declared_pledge": "1300000000000",
            "live_pledge": "1340017234650",
            "margin_cost": 0.01,
            "fixed_cost": "340000000",
            "reward_account": "stake1uxrkez465cmpdrragd3rhcgrc6lllnasxd7qtl735l489egx9yfxe",
            "owners": [
                "stake1uyu7kwazvf97ccvqrd5u6zruzep2yedn9z8mzqvl420rafq78lk3g",
                "stake1uy7ccasgje45h004zws56ktp7nvcnktvez5c76hd84n6a6sd2g66l"
            ],
            "registration": [
                "cc59d4f15db2b8a526db013653500ab33ed55b7cda04f8106f8b63928187df3f",
                "677d1e14cc4a34f12172b6c5a8d23fbc9ce8748b0786482d4452c80efd3a6cf8",
                "e9413ac372adc8e2198f08c38a2225df29e1ef6a63bc11984656e2c66c171a26",
                "5754e8369dafd4134eb490f1c8068e5dea5c65e47750bedf3b73644d7f295f21",
                "a9803c84a35751f36e3adf2f4ccc6420925ce79f0730669f08ca68f1f7b6a337",
                "38bae9866a5657f7dbfaf9a97aeec5da6c3891b2404173b80c8423c910a78815",
                "80c204617ef6ef3802de953d5f55e320c9ac04c3984d4535c02861e7311a82cc",
                "301199d542c4361d389d7e66c45423ab01526fa33675e1d25668495aa32046cd",
                "0fed054b13a1d01c8a902eb84a5f203866056e0e51bf0ded2a2c99048f5b6488",
                "4976bce53e717e7b8d7986d6dbd13247d6898ef1af5f948750b8917a1fe1ea38",
                "8109acf43efe0969fab0d30b64dba30b5bc8c7aeb1ab66584f997f033182c7f7",
                "c5ed64043d5267ce45e622fc0af6619607dc0876e6959949ee9d297b63800739",
                "833ec1b2bbaf0dae7946136865679794eae2d54613a40773f965e5e40962e356"
            ],
            "retirement": []
        },
        "metadata": {
            "pool_id": "pool1qqqqqdk4zhsjuxxd8jyvwncf5eucfskz0xjjj64fdmlgj735lr9",
            "hex": "00000036d515e12e18cd3c88c74f09a67984c2c279a5296aa96efe89",
            "url": "https://stakepool.at/atada.metadata3.json",
            "hash": "4811109f4fa6e2c1e3077fde6d1aa3120cc7a9edbd11d2c07a7828e452b48803",
            "ticker": "ATADA",
            "name": "ATADA Stakepool in Austria",
            "description": "Stake safe and secure in beautiful Austria! Please join our Telegram channel" +
                " https://t.me/atada_stakepool_austria",
            "homepage": "https://stakepool.at"
        }
    },
    {
        "pool_id": "pool1dmqzwuql5mylffvn7ln3pr9j7kh4gdsssrmma5wgx56f6rtyf42",
        "data": {
            "pool_id": "pool1dmqzwuql5mylffvn7ln3pr9j7kh4gdsssrmma5wgx56f6rtyf42",
            "hex": "6ec027701fa6c9f4a593f7e7108cb2f5af54361080f7bed1c835349d",
            "vrf_key": "d4f6f1fbcc7609f615bf8a43b870293bcdd61ec6e786fa1fb26b59413d8494fd",
            "blocks_minted": 3344,
            "blocks_epoch": 2,
            "live_stake": "8188664551715",
            "live_size": 0.0003618490276038897,
            "live_saturation": 0.1099937500790189,
            "live_delegators": 510,
            "active_stake": "8374624750623",
            "active_size": 0.00037074302874762433,
            "declared_pledge": "1000000000000",
            "live_pledge": "1262625590674",
            "margin_cost": 0.03,
            "fixed_cost": "170000000",
            "reward_account": "stake1u9h7awdh7aestzrkq0k8krfeesc957kmsmcrr0s3rl8wcfqeg3lgn",
            "owners": [
                "stake1uy9tvq444lvkwtzlalqpn5sswecfat6fgxmham5hushmacs2p9wdq",
                "stake1u9h7awdh7aestzrkq0k8krfeesc957kmsmcrr0s3rl8wcfqeg3lgn",
                "stake1u87vkp9awhqjmly3c27a60y6l6hpjdwal2tnnnrl8dsnngs9wr8cp"
            ],
            "registration": [
                "0130654e0395a9c17ff08f4b604aa777dcb740459281ca7ae32fe855d91df5ee",
                "bacd140908ba8153d772cebe88879c00ad36025cab988203b0a2d560ddad3628",
                "4af10f808a23033367edb65e15abb53b6008a4b7a1e54a07a98a81aaf42b571d",
                "1c59d1f4be25bed847c572d24acc7036aa72210456e4daa9ff1db572c4df292f",
                "9a6ecf07ac6974aea200e6d35ba73b7a8e0fa7cc958dc5d0b7f918142fda4a70"
            ],
            "retirement": []
        },
        "metadata": {
            "pool_id": "pool1dmqzwuql5mylffvn7ln3pr9j7kh4gdsssrmma5wgx56f6rtyf42",
            "hex": "6ec027701fa6c9f4a593f7e7108cb2f5af54361080f7bed1c835349d",
            "url": "https://tinyurl.com/y3aryqrz",
            "hash": "f9d5e977d38c1eb387cfdec0677284d11a3f9129855b542bd332d636f9bd7bbf",
            "ticker": "BNTY1",
            "name": "Cryptobounty1",
            "description": "Cryptobounty 1",
            "homepage": "https://cryptobounty.org"
        }
    },
    {
        "pool_id": "pool1qzlw7z5mutmd39ldyjnp8n650weqe55z5p8dl3fagac3ge0nx8l",
        "data": {
            "pool_id": "pool1qzlw7z5mutmd39ldyjnp8n650weqe55z5p8dl3fagac3ge0nx8l",
            "hex": "00beef0a9be2f6d897ed24a613cf547bb20cd282a04edfc53d477114",
            "vrf_key": "c0d1f9b040d2f6fd7fc8775d24753d6db4b697429f11404a6178a0a4a005867b",
            "blocks_minted": 7432,
            "blocks_epoch": 6,
            "live_stake": "25643182565586",
            "live_size": 0.0011331470006404113,
            "live_saturation": 0.34445052627769307,
            "live_delegators": 1107,
            "active_stake": "25632263685123",
            "active_size": 0.0011347353887794559,
            "declared_pledge": "10000000000",
            "live_pledge": "10065132958",
            "margin_cost": 0.02,
            "fixed_cost": "340000000",
            "reward_account": "stake1uy2ntdynjp9ezkxtfnghh6h3lhxnlz9e9geptf8pegdw5zq2c7dzu",
            "owners": [
                "stake1uyjd7xxuahjznpk6nvmmzf90eqykqqnlm9umltnphlrprpch8nyxg"
            ],
            "registration": [
                "fce1cb9a1e8f81577d135b93cc4bac312eb98c7eb47fd27d6ab1581e78b37762",
                "b443f7cfe88cdc280ebe329910698587f7ca42756d59e0929f99193c229b5f8d",
                "be64054dd06e95068550afb336146cbed2e81636169146d1f024bfdf0789be25",
                "f68c2f42790a2066073d3ba433bdd8b6d3a3477041d3895ba99d2868dd80f2cc",
                "d3919d8f8551f054107c4622e89a7d0fb8bd3f2e4bfb68322c4d19d3ddec38d4",
                "f73c840adf9d191316aec9a4481c72d5127f5d3d27efb932eecec2af4bf31b07",
                "e143e6bbb9d2a8005dd1e7dc6b7aaf49bc8dafbeea4c3e8ac45b942f8980fd14",
                "10377e249f8d6516da6f0b5d7018588d33d983e29d73a884f1a32afad920c53e",
                "b3dae206e1fa1de1dcf43190af083bf07fb6a2b9012994de31da9e35f4a4195f",
                "b72f2066352370035bf723e09509ed31163a9b9f5e26a638dc165d233ced20c7",
                "d966775ddaf8b205c50fc39471a7c39bfdc96e31b83f396abc1e52c7064224b3",
                "c3fd32b5fa6b3d8a68305d5aa7a44e5c5ea1fcf38b731eba352fb03e3e4caf89",
                "eed035526742473d2506e3f5b32f0cf6031a802c4e0bdaa09f09108a852c4a48",
                "246e0ee39efafcfd517edf6ab27a37d9d2ddfcd658a786ff04bfc4e8d706e554",
                "8f8afc57ad5fbcb83e072e7bf460d50d0c2560b8a91ab3e22669c0467da24910",
                "198a32218f588f74c41b9d3b954505aa789397dff75be24867769694e0fa15f3",
                "c67cbd7ac214f296682ade7ab0511e75ca8d9f91d19798ca8c0c8b0bbaa4d1ec",
                "0998eab76dab9448f9795788521307f41a4162cd126f5fa2cd1fd7d432e51452",
                "6978c249f936448973938d68776639d5765874b23c27d18573ea5a42f297e43f",
                "edf711318f17538bf6f31274e99c998c94e5fc48f940374e67afbe786d258768",
                "83b39c526185f0ed7cf850bee952af3a38262bebb6cc2cef1e621a52889d1177",
                "01b3294b22db573e14689ebe4f4d93b273f434c80ca4ec5a9aa2a6855ab315ad",
                "4feb888e66baa82a6ff2852380077d6f60ad1771a5bdb98fbe67caa302205394",
                "edf01e6e4f71cb01607d6f53df07700312e5603fc4413b153bf5b78c418e9635",
                "d2a0216bcb10ea8cf239f4274c972b1b07d6010a6900b5ae858baafbc7fec17b",
                "a549cf88841981e211c8d8fa7769b63ac5e5c5582e8cda94530e9ba79e412688",
                "9ee2bb91cceff247a583c091828ce69b0c924b7b418227bd8dab5da2a1f3085a",
                "0e5a40954e10c19762d87bbd22a109b146b5d679225149011752b7bcd34e8505",
                "2935b0f1716fa6356d44377b78139b911654fda296b43b2ddee8df84aaa3f482",
                "1978855685475ee0747789cc206fa69185e33f7cdf366b1ad5c1a0ce7523b383",
                "067f8fb151e45ec75a4adfd9963808766c3744b1e2045776f45ba61edf1e464e",
                "14944649ae24627c19d0fee00b4305357d9eae1454dec1f2a58cb57a260f2fd7",
                "87e221609e39bd0914b4ababe73167713cb78a7e5f64ae174617b66aa06bfb69",
                "4ce7447eb380167a92d030e85e5219a5bde54f423a25f73745873f67817634d3",
                "542a35b0b776229b229ab08399104abbf6bd6733de3f13192ce6e4192cd89c2a",
                "50680ea6ecdc45ff6041bb570765d5a98ba52dfca80f19be072b18cc5e47f451",
                "ababbfba24f6d2a2afb3421643f38a2c2590942a4bf42a792d278ec6da46f645",
                "bfa635988c404d84f9b54aa72ef320739ff457eb0668989b93079759edc9f62e",
                "ff83c4eaa9cd9c5d309712a3634a6e1f762ea4bc73307d50abd311f2af84deca"
            ],
            "retirement": []
        },
        "metadata": {
            "pool_id": "pool1qzlw7z5mutmd39ldyjnp8n650weqe55z5p8dl3fagac3ge0nx8l",
            "hex": "00beef0a9be2f6d897ed24a613cf547bb20cd282a04edfc53d477114",
            "url": "https://cardanostakehouse.com/be8fc51e-cd0d-440f-b385-11a.json",
            "hash": "4a09e738e49267737f41912a1be1c63790b877659483107f6e7f3cc80c7cd89e",
            "ticker": "BCSH",
            "name": "Blue Cheese Stakehouse",
            "description": "Bare metal stakepool in Florida, USA - https://t.me/blue_cheese_stake_house",
            "homepage": "https://bluecheesestakehouse.com"
        }
    },
    {
        "pool_id": "pool16tcjctesjnks0p8sfrlf8f3d3vrp2fdn2msy80sgg3cdjtayu3z",
        "data": {
            "pool_id": "pool16tcjctesjnks0p8sfrlf8f3d3vrp2fdn2msy80sgg3cdjtayu3z",
            "hex": "d2f12c2f3094ed0784f048fe93a62d8b061525b356e043be084470d9",
            "vrf_key": "235b76cb913acf64b0fba3ed5f515738751c0bc76bbcd8912425e9931478dd7a",
            "blocks_minted": 6542,
            "blocks_epoch": 2,
            "live_stake": "7885772519653",
            "live_size": 0.0003484645268005632,
            "live_saturation": 0.10592517085402474,
            "live_delegators": 744,
            "active_stake": "7882061694934",
            "active_size": 0.0003489373569052245,
            "declared_pledge": "5000000",
            "live_pledge": "10118359",
            "margin_cost": 0.01,
            "fixed_cost": "340000000",
            "reward_account": "stake1u9jln683r9ysex8v8mft6wt2thha9xpeapm92f52gswzp5sgc5ve4",
            "owners": [
                "stake1u9msfg7dtt3plmtfznkxljwes70wxsqgc4ql5qxe4et37hcm98d6n"
            ],
            "registration": [
                "f55a0ac35bc2b4eaa1b4fc17606812abcce4fa0855072455a48d204411907cb2",
                "d874fddb781faabccd3643cb38cc4010c01b143e8dff0c9449b46015b9a2e5cc",
                "06448b77da028282cf4d873c10115724fd1ea5c94520ee8bed2baa6ee8cd6f1b",
                "50ff01d660c509fe2c9524566833b60c94e5a0760bef4f54806f1364772f6695",
                "fd2c33f055fe6642377e6b294b51a6fb39941bd131b34a5a147a78ba7e261034",
                "434e102e80937f4d5b713e781404d076e512f4c6370e66d3b701675e21a12e00",
                "ae97e0bf0fde601e24572f5e970fd5c5dff7d367725a95e8ef83b758ec6b2a4a",
                "11d802af28fa20c2dc220324a42c544f8a0418df55be1f6892f900ebd44317da",
                "a7a29018b76147115097d79ae15659dff057be2b0e6555ceff64741b4b1603e4",
                "0ba3ad31e00d525d9be60720e1562f227c511e84562675dec244ce136a251f59"
            ],
            "retirement": []
        },
        "metadata": {
            "pool_id": "pool16tcjctesjnks0p8sfrlf8f3d3vrp2fdn2msy80sgg3cdjtayu3z",
            "hex": "d2f12c2f3094ed0784f048fe93a62d8b061525b356e043be084470d9",
            "url": "https://tap-ada.github.io/poolmeta.json",
            "hash": "eecc610ce196d8f56b9f7dbda6fb1617c9a731286a573aaec835a99d0dfee058",
            "ticker": "TAPSY",
            "name": "TapTap Vienna",
            "description": "low fees|safe|reliable|known from ITN|TU Wien students",
            "homepage": "https://tap-ada.github.io"
        }
    },
    {
        "pool_id": "pool1qzlwlpcsgflr9z3f24fg836tyq45p0kf5cnrp20s8v0psp6tdkx",
        "data": {
            "pool_id": "pool1qzlwlpcsgflr9z3f24fg836tyq45p0kf5cnrp20s8v0psp6tdkx",
            "hex": "00beef8710427e328a29555283c74b202b40bec9a62630a9f03b1e18",
            "vrf_key": "f1fc18f5a917ba2292a8c62dbe2c3d655bd936715986e72f8fca4d2f1d80e2b2",
            "blocks_minted": 8414,
            "blocks_epoch": 9,
            "live_stake": "25834097541949",
            "live_size": 0.0011415833455554686,
            "live_saturation": 0.34701498035488637,
            "live_delegators": 864,
            "active_stake": "25927354072979",
            "active_size": 0.0011477989835560344,
            "declared_pledge": "10000000000",
            "live_pledge": "10056630021",
            "margin_cost": 0.02,
            "fixed_cost": "340000000",
            "reward_account": "stake1ux5ncxkwkw97jn9cm7ujqgm5lv52espertjlkzxp9epw23qcj03uy",
            "owners": [
                "stake1uyspqx4xxjmx2hgv8zl048fme2rrzuvw8h92j3mhvy9fkwql02yxj"
            ],
            "registration": [
                "e0f3ed4c6f7aff81d78d800a77560ced045aa06dcbab824f2b7de431a6bbc361",
                "b38bad7488dcd9b52931f1031001c96614ad076e076b52c7733519bdbaf2ea25",
                "202d780144209a15bc7fa7e451778b07a9155afe4a1cc64153c0f6fdb31dbca6",
                "8164c39e9a81b2f44375f69b830bb31cdd2640de4f1be2c8be831062b4bff16c",
                "d5ca89a93ec918036abfb7b231569c4807bcf5e50c51c5550bae5fe21874530c",
                "fd0d3bab63342bf3171d8109c1ed0678e1cbcb2a891cf4b39583087cef8f34e6",
                "49d25a9a96def86ef49b9d888badd4414e7f4025a47708e13615137cb7bf429a",
                "e494a0a1895c46d0135aae4546c7a5f315d1e26cb5e8fa1313a78ee9f97c331e",
                "9d45258b39a668d6bfe850eeb207a3634bc724352d4d8340ada984a7d6045d53",
                "a1c1e4114832c3a568f188bdd314a0f68c5c8e869b1d74c3bf88c2efc145fbb9",
                "620777c5aba7aa3144614c7afa73c3f7798212a9efb7c223e32216a9dbbc3ce2",
                "4d64f6bc09f6ec77948eb6261ef5bcdb582956e11c261acaf352d96091521bcd",
                "a52741ff23ace8f346782a9078b5723700961dc6e7da805bab0c6df9c8ce4209",
                "cb3a1ba1b933b2971bafc04e79c3f2ee2884bb33c75c9816a1d0083113ecfd20",
                "83c85c52f9f082f3a1e90526b3826e2e08c41911c3793761be57b53485952ce0",
                "b57bf4bcc2b1eee72d2fac4cb7cd23966ef8f321ad9943c41add44fb003ecad8",
                "ec06019099964912262804146edd59b0cc79f44f7ca493180208ec5a8a24f2ff",
                "9a873d877b07272058b894e777691acf788081f319e9aeddc766c049f01aede2",
                "594bc3649ca3593dbb0d0f986b9614d5a4edd2a264c641331ed01969d9a914a1",
                "70e2af2052a7ed9b45ce31d6fddd038fe2776b0eea170632fd74930a2f1e0ebb",
                "992ca45ed1a5eed2faa85350b2d6c51e92a75c6758f7eba1ee217989821ac159",
                "52e6bce6822e0857e760b51cc168375005f85586f11e840f620de97b3d469927",
                "582762298367597dcc9f8a959661982690c8eb48b6884637ceed2bf70fb9ef28",
                "8fb014d6ff7e226a26082f976aea45c1f21c8cf885ecdfb122d4e7c006ffb35a",
                "c7df1f0c8f2efb8a6e451cad40435d98f29bc3847d0839d6dff12853bd3e6030",
                "3e5f66feaf3a2abb45ca0518030fea8f99bf07e7fb6659a4b7c09b473a2efecc",
                "6db0308c06bbdef8d1941c6f8b57f36cd4632f5fa29a13939f26d41acca2e551",
                "02a35149032de0ae429edf4e419484d435f733eb3768250c30a5464ddeaf1184",
                "ac455571129eb5297dd323b4ff0c5e2e0af20d678a4456954ad05f029cf18b9c",
                "4701ee778f0776347576149b4af27a2d7baefef600619c0dd608021890eca75c",
                "7865da80b27a7d86624d7db53e5eb0a3ba5d803b151ca6bed57b0cb49c977e82",
                "6df8e6ce55854d9e88eabb7325df163fdf8aeadd3f72a31c955b34f3c425f28a",
                "a3b671b32a6319966b8411fb065f57d46ef3b038f470688c19c2779485801603",
                "f5343b492839d0bbf63a0f1e6513b5ca9f65c410bcb632e78831a4457feff33e",
                "9806c3880bab68be86530333aa81f46a100ac46cee3ebe0baf9fbba2e3e8f9e7",
                "0d20278800e035ecf20391bd74882141e57162e4599302ac1f50ea171ecdcc84",
                "8f3a86ff182b4e637f85831e641fb37534e3f509522feb45dae4dbef609f1741",
                "e44e2f7c4001498e9bcfa99190ccb3de176f33d4d33bd7c107e570ec38a1456b",
                "a7f92f24dd6cb5815a2dd74c99b0995aeb3254bbe80006ffa37666194c1eb5ef",
                "6deb8b0d967994fce8cab9fcf1c7d5de27f7baa0be104c69ff542548db163d0a"
            ],
            "retirement": []
        },
        "metadata": {
            "pool_id": "pool1qzlwlpcsgflr9z3f24fg836tyq45p0kf5cnrp20s8v0psp6tdkx",
            "hex": "00beef8710427e328a29555283c74b202b40bec9a62630a9f03b1e18",
            "url": "https://cardanostakehouse.com/43d70337-06d3-4cac-bb57-0ab.json",
            "hash": "5bf29957967f2d1029acfe5a6260ee8776baf4f926cc1f497964438867b9c5c7",
            "ticker": "BCSH0",
            "name": "Blue Cheese Stakehouse",
            "description": "Bare metal stakepool in Florida, USA - https://t.me/blue_cheese_stake_house",
            "homepage": "https://bluecheesestakehouse.com"
        }
    },
    {
        "pool_id": "pool1p9sda64t6l9802tsu2fj6phvt9xfqgcpjucyr3kek8wzurmn8rz",
        "data": {
            "pool_id": "pool1p9sda64t6l9802tsu2fj6phvt9xfqgcpjucyr3kek8wzurmn8rz",
            "hex": "0960deeaabd7ca77a970e2932d06ec594c902301973041c6d9b1dc2e",
            "vrf_key": "4ed27c7004513e93113f3e7bed711f7426fc9fa31620da28dfc14f164d48fee8",
            "blocks_minted": 553,
            "blocks_epoch": 1,
            "live_stake": "1031924606669",
            "live_size": 4.5599732792265915e-5,
            "live_saturation": 0.013861265969500217,
            "live_delegators": 54,
            "active_stake": "1033948840294",
            "active_size": 4.5772716513916024e-5,
            "declared_pledge": "100000000000",
            "live_pledge": "312052368465",
            "margin_cost": 0,
            "fixed_cost": "340000000",
            "reward_account": "stake1uy76j6taxp45dwxe5247ch5pcf8hrlqsxknt5ytz3he4nwg5y2yma",
            "owners": [
                "stake1uycj7mvz8v20swfy7g68czqjavwvqrj7wgya6zy83wuwcps9lv0a0",
                "stake1uy76j6taxp45dwxe5247ch5pcf8hrlqsxknt5ytz3he4nwg5y2yma"
            ],
            "registration": [
                "03d26091087675df16f615ee2395671f2f9c1d1c20441d03bca198f7acf78bd8",
                "b0abd353ec2fed680400e1c568debccae966880a3b0b7a20d667ae1211e3ca89",
                "77415c35b43f0691d49e6fe5113cf9f710a3cff1420b90b0b65c7f40731fd629",
                "ba738b201006a5cf8b2d2f930d2b5cc78520550eacbb66edececacabf7832211",
                "72577375e4ad4c3f91914d737057524e7867a8c14ce59a3c94609fe426424bee",
                "52eea01524cc718a6f4a8dd3eb5aa49ae8846beed79c53c520b71b6e738f0e8f",
                "5c757d7042a527a7942865d5ec5dcbf8c85d5a06f6c3ccd1619d73f5efb4a59f",
                "f7875a2a02b980bb6fbb1bcc87049ba9ea54926224f3131fd6d6d64510316685",
                "6808e82520bc12ec1cd8db16c5870e692538adb0ee2adcbf2fb638ca641ab38d",
                "6b81464342a8249bd6acbdac60dab7d284f9fceef6810a88c4ddb7a1d67c62e8",
                "bb4f53267ce0bab26e734f8c92dfae6e7cd3f91bd45f1e534251fd01a44a0356",
                "cac85c89b3d94579c2efed1b384e791154de6061ff8e5cd73e047850cd22f9a5",
                "984ea294d430ff0528e542b54c3a0ac3f4be2979c79b5fa3a62922b664862f70"
            ],
            "retirement": []
        },
        "metadata": {
            "pool_id": "pool1p9sda64t6l9802tsu2fj6phvt9xfqgcpjucyr3kek8wzurmn8rz",
            "hex": "0960deeaabd7ca77a970e2932d06ec594c902301973041c6d9b1dc2e",
            "url": "https://k8s-pool.subnet.dev/pool-metadata/pool.json",
            "hash": "0368aa856fb7dee995237cc69fd680e421bade4cafe147e79082d02e8c56d582",
            "ticker": "K8S",
            "name": "K8S Staking Pool",
            "description": "Pool based on a high availability Kubernetes cluster managed and hosted in Switzerland.",
            "homepage": "https://k8s-pool.subnet.dev"
        }
    },
]

export const mockApiPools = (page: number, perPage: number): AjaxResponse<PaginatedData<Pool>> => {
    return {
        nonce: 'nonce_value',
        success: true,
        message: '',
        data: {
            total: poolMockData.length,
            items: filterPaginatedRange(poolMockData, page, perPage)
        }
    }
}

export const mockApiPool = (poolId: string): AjaxResponse<PoolData> => {
    return {
        nonce: 'nonce_value',
        success: true,
        message: '',
        data: poolMockData.find(a => a.pool_id === poolId)
    }
}